import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

export default function GuestRoute() {
  const { user } = useAuth();

  // If a user IS logged in, kick them to the dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}