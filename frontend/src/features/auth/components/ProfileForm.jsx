import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authApi } from '../api/authApi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { AuthCard } from './AuthCard';

export default function ProfileForm() {
    const { user, setUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    // Build/cleanup local preview URL whenever the selected file changes.
    useEffect(() => {
        if (!image) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(image);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [image]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await authApi.updateProfile({ name, image });
            if (response.status === 200) {
                if (response.data?.user) setUser(response.data.user);
                setImage(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                toast.success('Profile updated successfully.', { autoClose: 3000, position: 'bottom-right' });
            } else {
                toast.error(response.data?.message || 'Failed to update profile. Please try again.', { autoClose: 3000, position: 'bottom-right' });
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update profile. Please try again.', { autoClose: 3000, position: 'bottom-right' });
        } finally {
            setSubmitting(false);
        }
    };

    const displayedAvatar = preview || user?.image_url || undefined;
    const fallbackLetter = (user?.name || 'U').charAt(0).toUpperCase();

    return (
      <>
        <AuthCard 
        title="Profile"
        description="Update your profile information."
        onSubmit={handleSubmit}
        children={
          <>
            <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={displayedAvatar} alt={user?.name} />
                    <AvatarFallback>{fallbackLetter}</AvatarFallback>
                </Avatar>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {image ? 'Change selected image' : 'Upload new picture'}
                </Button>
                <Input
                    ref={fileInputRef}
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                {image && (
                    <p className="text-xs text-muted-foreground">
                        Selected: {image.name}
                    </p>
                )}
              </div>
              <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} readOnly disabled />
              </div>
          </>
        }
        footer={
          <>
            <Button type="submit" className="w-full mt-4" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Profile'}
            </Button>
            <Button type="button" className="w-full" onClick={() => navigate('/change-password')}>
                    Change Password
            </Button>
          </>
        }
       
        />

        </>
    );
}
