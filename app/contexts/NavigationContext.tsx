import { createContext } from "react";

export interface NavigationContextProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isHovered: boolean;
  handleSidebarMouseEnter: () => void;
  handleSidebarMouseLeave: () => void;
}

export const NavigationContext = createContext<
  NavigationContextProps | undefined
>(undefined);
