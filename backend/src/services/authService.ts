import ElasticClient from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerUserService = async (userData: User): Promise<{ message: string; }> => {
  const existingUser = await ElasticClient.search<User>({
    index: "users",
    query: { match_phrase: { email: userData.email.toLowerCase() } },
  });

  if ((existingUser?.hits?.total as { value: number })?.value > 0) {
    throw new Error("User already registered");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  const hashedConfirmPassword = await bcrypt.hash(userData.confirmPassword, saltRounds);

  const result = await ElasticClient.index({
    index: "users",
    document: { ...userData, email: userData.email.toLowerCase(), password: hashedPassword, confirmPassword: hashedConfirmPassword },
  });

  return { message: "User registered successfully" };
};


export const loginUserService = async (
  email: string,
  password: string
): Promise<{ message: string; token?: string; user?: Omit<User, "password"> }> => {
  const result = await ElasticClient.search<User>({
    index: "users",
    query: { match_phrase: { email: email.toLowerCase() } },
  });

  if ((result?.hits?.total as { value: number })?.value === 0) {
    return { message: "User not found" };
  }

  const user = result?.hits?.hits[0]?._source;

  if (!user) {
    return { message: "User not found" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { message: "Invalid credentials" };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
  
  const { password: _, ...userWithoutPassword } = user;

  return { message: "Login successful", token, user: userWithoutPassword };
};
