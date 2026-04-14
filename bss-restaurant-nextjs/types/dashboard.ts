import { LucideIcon } from "lucide-react";
import { User } from "./common";

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HeaderProps {
  toggleSidebar: () => void;
  userProfile: User;
}
