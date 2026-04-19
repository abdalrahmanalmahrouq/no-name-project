import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authApi } from '../api/authApi';
import { toast } from 'react-toastify';
import { FormField } from '@/components/FormField';
import { ErrorMessage } from '@/components/ErrorMessage';
import { AuthCard } from './AuthCard';

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await authApi.changePassword({ 
                current_password: currentPassword, 
                new_password: newPassword, 
                new_password_confirmation: confirmNewPassword 
            });
            if (response.status === 200) {
                toast.success('Password changed successfully.', { autoClose: 3000, position: 'bottom-right' });
            } else {
                toast.error(response.data.message || 'Failed to reset password. Please try again.', { autoClose: 3000, position: 'bottom-right' });
            }
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to change password. Please try again.');
        }
        finally {
            setLoading(false);
        }
    }
    return (

        <AuthCard
        title="Change Password"
        description="Enter your current password and new password to change your password."
        onSubmit={handleSubmit}
        children={
            <>
            <FormField 
            id="currentPassword"
            label="Current Password"
            type="password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required 
            /> 
            <FormField 
            id="newPassword"
            label="New Password"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            required 
            /> 
            <FormField 
            id="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required 
            /> 
                
            {error && <ErrorMessage error={error} /> }
            </>
        }
        footer={
            <Button type="submit" className="w-full mt-4">Change Password</Button>
        }
      
    />
    )
}
