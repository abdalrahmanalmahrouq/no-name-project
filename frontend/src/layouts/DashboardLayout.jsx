import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";
import { authApi } from "@/features/auth/api/authApi";
import { toast } from 'react-toastify';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function DashboardLayout() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await authApi.logout();
        setUser(null); // Clear the context state
        navigate('/login');
        toast.success('Logout successful.', { autoClose: 3000, position: 'bottom-right' });
      } catch (error) {
        console.error("Logout failed", error);
      }
    };
    
  
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="px-6  flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-bold text-foreground">
            <Link to="/">No-Name Project</Link>
            </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, <strong className="text-foreground">{user?.name}</strong>
            </span>
           
              <Button variant="link" onClick={() => navigate('/profile')}>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.image_url || undefined}
                    alt={user?.name || 'Profile'}
                  />
                  <AvatarFallback>
                    {(user?.name || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
              <Button variant="logout"  onClick={handleLogout}>
                Logout
              </Button>
            </div>
        
        </header>
  
        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    );
  }