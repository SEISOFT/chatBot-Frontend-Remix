import { createContext } from "react";

export interface NavigationContextProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);
