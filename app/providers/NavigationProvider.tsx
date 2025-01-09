import { ReactNode, useState, useMemo } from "react";
import { NavigationContext } from "~/contexts/NavigationContext";

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  const contextValue = useMemo(
    () => ({
      isSidebarCollapsed,
      toggleSidebar,
    }),
    [isSidebarCollapsed]
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};
