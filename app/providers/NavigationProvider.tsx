import { ReactNode, useState, useMemo } from "react";
import { NavigationContext } from "~/contexts/NavigationContext";

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Alterna el estado del sidebar (colapsado/expandido) de forma global
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  // Funciones específicas para el hover
  const handleSidebarMouseEnter = () => setIsHovered(true);
  const handleSidebarMouseLeave = () => setIsHovered(false);

  const contextValue = useMemo(
    () => ({
      isSidebarCollapsed,
      toggleSidebar,
      isHovered,
      handleSidebarMouseEnter,
      handleSidebarMouseLeave,
    }),
    [isSidebarCollapsed, isHovered]
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};
