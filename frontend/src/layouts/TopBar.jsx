import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAV_ITEMS } from "@/constants/nav";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/useTheme";

function usePageMeta() {
  const { pathname } = useLocation();
  return useMemo(() => {
    const match = APP_NAV_ITEMS.find((item) =>
      pathname === item.to || pathname.startsWith(`${item.to}/`)
    );
    return {
      label: match?.label ?? "Workspace",
     
    };
  }, [pathname]);
}

export default function TopBar() {
  const { theme, toggle } = useTheme();
  const { label } = usePageMeta();

  const [notifOpen, setNotifOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notifRef = useRef(null);

  useEffect(() => {
    if (!notifOpen) return;
    const onClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setNotifOpen(false);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [notifOpen]);

  const toggleNotifications = () => {
    setNotifOpen((v) => {
      const next = !v;
      if (next) setHasUnread(false);
      return next;
    });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30",
        "h-16 flex items-center",
        "relative",
        "border-b border-white/10 text-white"
      )}
      aria-label="Workspace top bar"
    >
      <div className="flex-1 flex items-center gap-4 px-6">
        {/* Page title + caption */}
        
        <div className="min-w-0">
         
          <h1 className="mt-6 text-[20px] font-semibold tracking-[-0.374px] text-white truncate">
            {label}
          </h1>
        </div>

        {/* Search pill */}
        <div className="ml-auto hidden md:flex max-w-[380px] flex-1">
          <button
            type="button"
            onClick={() => {
              /* placeholder \u2014 wire to command palette later */
            }}
            className={cn(
              "group/search w-full inline-flex items-center gap-2",
              "h-9 px-3 rounded-full",
              "bg-white/5 hover:bg-white/10",
              "border border-white/10 hover:border-white/20",
              "transition-colors",
              "text-[14px] tracking-[-0.224px] text-white/60",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]/60"
            )}
            aria-label="Open search"
          >
            <Search className="size-4 shrink-0" />
            <span className="flex-1 text-left">Search</span>
            <kbd
              className={cn(
                "inline-flex items-center gap-0.5",
                "px-1.5 py-0.5 rounded-md",
                "bg-white/10 border border-white/10",
                "text-[11px] font-medium text-white/60 tracking-normal"
              )}
            >
              <span className="text-[13px] leading-none">⌘</span>
              <span>K</span>
            </kbd>
          </button>
        </div>

        {/* Right-side actions */}
        <div className="ml-auto md:ml-2 flex items-center gap-1">
          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleNotifications}
              aria-label="Notifications"
              aria-expanded={notifOpen}
              aria-haspopup="menu"
              className="relative size-9 text-white/80 hover:bg-white/10 hover:text-white rounded-full cursor-pointer"
            >
              <Bell className="size-4" />
              {hasUnread && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-2 right-2",
                    "block size-1.5 rounded-full",
                    "bg-[#0071e3] ring-2 ring-black/60"
                  )}
                />
              )}
            </Button>

            {notifOpen && (
              <div
                role="menu"
                className={cn(
                  "absolute right-0 mt-2 w-80 origin-top-right",
                  "rounded-xl overflow-hidden",
                  "bg-black/85 backdrop-blur-xl backdrop-saturate-180",
                  "border border-white/10 shadow-[rgba(0,0,0,0.45)_3px_5px_30px_0px]"
                )}
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-[15px] font-semibold tracking-[-0.374px] text-white">
                    Notifications
                  </p>
                  <p className="text-[12px] tracking-[-0.12px] text-white/50">
                    You're all caught up
                  </p>
                </div>
                <div className="px-4 py-8 text-center">
                  <div className="mx-auto mb-3 grid size-10 place-items-center rounded-full bg-white/5 border border-white/10">
                    <Bell className="size-4 text-white/60" />
                  </div>
                  <p className="text-[14px] tracking-[-0.224px] text-white/70">
                    No new notifications
                  </p>
                  <p className="mt-1 text-[12px] tracking-[-0.12px] text-white/40">
                    We'll let you know when something arrives.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggle}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={theme === "dark"}
            className="size-9 text-white/80 hover:bg-white/10 hover:text-white rounded-full cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        </div>
      </div>
      
    </header>
  );
}
