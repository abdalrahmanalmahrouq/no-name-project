import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/features/auth/LoginPage';
import RegisterPage from '@/features/auth/RegisterPage';
import AuthLayout from '@/layouts/AuthLayout';
import GuestRoute from '@/components/GuestRoute';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import ForgotPasswordPage from '@/features/auth/ForgotPasswordPage';
import ProfilePage from '@/features/auth/ProfilePage';
import ChangePasswordPage from '@/features/auth/ChangePasswordPage';
export const router = createBrowserRouter([
  // --- Public Auth Routes ---
  {
    element: <GuestRoute />,
    children: [
      {
        
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
          {
            path: '/forgot-password',
            element: <ForgotPasswordPage />,
          }
        ],
      },
      
    ],
  },
  
  // --- Protected App Routes (Placeholder) ---
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: (
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">Dashboard Overview</h2>
                <p className="text-muted-foreground">Select an item from the sidebar to begin.</p>
              </div>
            )
          },
          {
            path: '/profile',
            element: <ProfilePage />
          },
          {
            path: '/change-password',
            element: <ChangePasswordPage />
          }
        ],
      },
      {
        path: '*',
        element: <div>
          <h1>404</h1>
          <p>Page not found</p>
          <Button onClick={() => history.back()}>Go to home</Button>
        </div>
      }
    ],
  },
  
]);