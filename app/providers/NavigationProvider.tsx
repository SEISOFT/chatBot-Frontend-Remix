import { ReactNode, useState } from "react";
import { NavigationContext } from "~/contexts/NavigationContext";

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
    const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  
    return (
      <NavigationContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
        {children}
      </NavigationContext.Provider>
    );
  };
