import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { authApi } from "@/features/auth/api/authApi";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function Logout({ collapsed }) {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      navigate("/login");
      toast.success("Logout successful.", {
        autoClose: 3000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.", {
        autoClose: 3000,
        position: "bottom-right",
      });
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      title={collapsed ? "Logout" : undefined}
      className={cn(
        "w-full rounded-lg gap-3 px-3 h-10",
        "text-[14px] tracking-[-0.224px] font-medium",
        "text-white/80 hover:bg-white/10 hover:text-white",
        "cursor-pointer",
        collapsed && "justify-center px-0"
      )}
    >
      <LogOut className="size-4 shrink-0" />
      {!collapsed && <span>Logout</span>}
    </Button>
  );
}
