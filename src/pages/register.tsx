import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await fetch('/api/register', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error message from server
        throw new Error(errorData.message || 'Registration failed'); // Or a generic message
      }

      const { user, token }  = await response.json();

      dispatch(setCredentials({ user, token }));
      navigate('/');
      toast.success('Registration successful!');

    } catch (error: any) { // Type the error as any to access the message
      toast.error(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    // ... (rest of the JSX remains the same)
    <div></div>
  );
};

export default Register;