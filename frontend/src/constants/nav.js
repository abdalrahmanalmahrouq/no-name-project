import {
  LayoutDashboard,
  KeyRound,
  UserRound,
  Repeat,
  ListChecks,
} from "lucide-react";

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
    to: "/tasks",
    label: "To-do",
    description: "Daily tasks & priorities",
    icon: ListChecks,
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
