import { LayoutDashboard, KeyRound, UserRound } from "lucide-react";

export const APP_NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    description: "Workspace overview",
    icon: LayoutDashboard,
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
