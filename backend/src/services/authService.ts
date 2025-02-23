import ElasticClient from "../config/db";

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export const registerUserService = async (userData: User): Promise<void> => {
  await ElasticClient.index({
    index: "users",
    document: userData,
  });
};

export const loginUserService = async (email: string): Promise<User | null> => {
  const result = await ElasticClient.search<User>({
    index: "users",
    query: { match: { email } },
  });
  return result.hits.hits[0]?._source || null;
};
