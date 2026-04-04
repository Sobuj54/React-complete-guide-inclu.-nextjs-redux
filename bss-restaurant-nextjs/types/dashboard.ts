import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
