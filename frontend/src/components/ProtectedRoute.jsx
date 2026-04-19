import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

export default function ProtectedRoute() {
  const { user } = useAuth();

  // If no user is logged in, kick them to the login page
  // guest user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected page
  return <Outlet />;
}