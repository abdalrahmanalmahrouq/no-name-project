import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FormField } from '@/components/FormField';
import { ErrorMessage } from '@/components/ErrorMessage';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { GoogleAuthButton } from './GoogleAuthButton';
import BackToHomeButton from './BackToHomeButton';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await authApi.login({ email, password });
      const { data } = await authApi.getUser();
      setUser(data);
      navigate('/dashboard'); // Redirect to dashboard on success
      toast.success('Login successful.', { autoClose: 3000, position: 'bottom-right' });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <h2 className='font-bold text-2xl mb-6 text-white'>
        Login
      </h2>

      <div className="relative w-full max-w-md mx-auto">
        <BackToHomeButton />
      <AuthCard
      title="Welcome Back"
      description="Enter your credentials to access your account."
      onSubmit={handleSubmit}
      children={
        <>   
          <FormField 
          id="email"
          label="Email"
          placeholder = "name@example.com" 
          value ={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          /> 
          <FormField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
          {error && <ErrorMessage error={error} /> }
        </>
      }
      footer ={
        <>  
          <Button type="submit" variant="hero" className="w-full mt-4">Sign In</Button>   
          <GoogleAuthButton title="Sign in with Google" />
          <Button variant="link" onClick={() => navigate('/register')} type="button" className="cursor-pointer">
            Don't have an account? Sign up
          </Button>
          <Button variant="link" onClick={() => navigate('/forgot-password')} type="button" className="cursor-pointer">
            Forgot password?
          </Button>
        </>
      }
      />
      </div>
    </>
  );
}