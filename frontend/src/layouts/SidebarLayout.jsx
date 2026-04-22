import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ChevronLeft, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackgroundOverlay from "@/components/BackgroundOverlay";
import { useAuth } from "@/features/auth/context/AuthContext";
import { cn } from "@/lib/utils";
import Logout from "@/components/Logout";
import AIAgentBubble from "@/features/landing/components/AIAgentBubble";
import TopBar from "@/layouts/TopBar";
import { APP_NAV_ITEMS } from "@/constants/nav";
import { useTheme } from "@/lib/useTheme";

const STORAGE_KEY = "nn-sidebar-collapsed";

export default function SidebarLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

 
  const initial = (user?.name || "U").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground flex relative">
      {/* Shared chrome backdrop — one continuous image behind sidebar + topbar */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <BackgroundOverlay />
      </div>

      <aside
        className={cn(
          "sticky top-0 h-screen flex flex-col",
          "relative z-10 text-white",
          isDark ? "border-r border-black/30" : "border-r border-white/20",
          "transition-[width] duration-300 ease-out",
          collapsed ? "w-[76px]" : "w-[260px]"
        )}
        aria-label="Primary"
      >
        <div className="flex flex-col h-full">
        {/* Brand + Toggle */}
        <div
          className={cn(
            "flex items-center h-16 px-3 border-b border-white/10",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <Link
              to="/"
              className="text-[17px] font-semibold tracking-[-0.374px] text-white whitespace-nowrap overflow-hidden"
            >
              No-Name Project
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
            className="text-white hover:bg-white/10 hover:text-white rounded-full"
          >
            {collapsed ? (
              <Menu className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </Button>
        </div>

        {/* Profile */}
        <div
          className={cn(
            "px-3 py-5 border-b border-white/10",
            collapsed ? "flex justify-center" : ""
          )}
        >
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className={cn(
              "group flex items-center gap-3 w-full rounded-xl p-2",
              "hover:bg-white/5 transition-colors",
              collapsed && "justify-center w-auto"
            )}
          >
            <Avatar className="size-10 ring-2 ring-white/10 shrink-0">
              <AvatarImage
                src={user?.image_url || undefined}
                alt={user?.name || "Profile"}
              />
              <AvatarFallback className="bg-[#2997ff] text-white font-semibold">
                {initial}
              </AvatarFallback>
            </Avatar>

            {!collapsed && (
              <div className="min-w-0 text-left">
                <p className="text-[12px] leading-tight text-white/60 tracking-[-0.12px]">
                  Welcome back
                </p>
                <p className="text-[15px] font-semibold text-white truncate tracking-[-0.374px]">
                  {user?.name || "Guest"}
                </p>
              </div>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="flex flex-col gap-1">
            {APP_NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  title={collapsed ? label : undefined}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5",
                      "text-[14px] tracking-[-0.224px] font-medium",
                      "text-white/70 hover:text-white hover:bg-white/10",
                      "transition-colors",
                      collapsed && "justify-center px-0",
                      isActive &&
                        "bg-[#0071e3] text-white hover:bg-[#0077ed] hover:text-white"
                    )
                  }
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <Logout collapsed={collapsed} />
        </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="relative z-10 flex-1 min-w-0 flex flex-col">
        <TopBar />
        <div
          className={cn(
            "flex-1 flex flex-col min-w-0",
            isDark ? "text-white" : "bg-white text-[#1d1d1f]"
          )}
        >
          <div className="flex-1 w-full max-w-[1200px] mx-auto px-8 py-10">
            <Outlet />
          </div>
        </div>
      </main>

      <AIAgentBubble />
    </div>
  );
}
