import { LayoutDashboard, KeyRound, UserRound, Repeat } from "lucide-react";

export const APP_NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    description: "Workspace overview",
    icon: LayoutDashboard,
  },
  {
    to: "/routines",
    label: "Routines",
    description: "Daily habits & rituals",
    icon: Repeat,
  },
  {
    to: "/profile",
    label: "Profile",
    description: "Account details",
    icon: UserRound,
  },
  {
    to: "/change-password",
    label: "Change Password",
    description: "Security settings",
    icon: KeyRound,
  },
];
