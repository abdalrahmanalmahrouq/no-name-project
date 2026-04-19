import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authApi } from '../api/authApi';
import { toast } from 'react-toastify';
import { FormField } from '@/components/FormField';
import { AuthCard } from './AuthCard';
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      toast.success('Password reset link sent to your email.',
         { autoClose: 3000,
            onClose: () => {
                navigate('/login');
            }
         });
      
    }
    
    catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password.');
    }
    finally {
        setLoading(false);
    }
  };
  return (
    
    <AuthCard
    title="Forgot Password"
    description="Enter your email to reset your password."
    onSubmit={handleSubmit}
    children={
      <FormField 
        id="email"
        label="Email"
        placeholder = "name@example.com" 
        value ={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
        /> 

    } 
    footer={
      <Button type="submit" className="w-full mt-4">Reset Password</Button>
    }
    />
    
  );
}