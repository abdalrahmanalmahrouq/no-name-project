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

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await authApi.register({ 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation 
      });
      const { data } = await authApi.getUser();
      setUser(data);
      navigate('/dashboard'); 
      toast.success('Registration successful.', { autoClose: 3000, position: 'bottom-right' });

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <>
    <h2 className='font-bold text-2xl mb-6'>
      Register
    </h2>

    <AuthCard
    title = "Create an account" 
    description= "Enter your details below to create your account."
    onSubmit={handleSubmit}
    footer={
      <>
        <Button type="submit" className="w-full mt-4">Sign Up</Button>
        <GoogleAuthButton title={" Sign up with Google"} />
        <Button variant="link" onClick={() => navigate('/login')} type="button" className="cursor-pointer">
          Already have an account? Sign in
        </Button>
      </>
    }
    children={
      <>
        <FormField
        id="name"
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
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
       <FormField
        id="password_confirmation"
        label="Confirm Password"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
        />
        {error && <ErrorMessage error={error} /> }
        
      </>
    }
    />
    
    </>
  );
}