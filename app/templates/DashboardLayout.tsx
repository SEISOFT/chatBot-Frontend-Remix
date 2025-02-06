import { useBreakpointValue, Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { Navbar } from "~/components/organisms/navigation/Navbar";
import { Sidebar } from "~/components/organisms/navigation/SideBar";
import { useNavigation } from "~/hooks/useNavigation";
import { AuthProvider } from "~/providers/AuthProvider";
import { NavigationProvider } from "~/providers/NavigationProvider";
import { UserProvider } from "~/providers/UserProvider";

export default function DashboardLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <NavigationProvider>
          <Layout />
        </NavigationProvider>
      </UserProvider>
    </AuthProvider>
  );
}

// Separo la definición para poder usar useNavigation (que depende de un Provider)
function Layout() {
  const { isSidebarCollapsed } = useNavigation();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const getSidebarWidth = (): string => {
    if (isSidebarCollapsed) return "90px";
    if (isMobile) return "314px";
    return "272px";
  };
  const sidebarWidth = getSidebarWidth();
  const navbarHeight = "54px";

  return (
    <Box>
      <Sidebar />
      <Navbar />

      {/* Contenido principal que se desplaza en scroll */}
      <Box
        as="main"
        position="relative"
        ml={isMobile ? 0 : sidebarWidth}
        mt={navbarHeight}
        minHeight="calc(100vh - 60px)"
      >
        <Outlet />
      </Box>
    </Box>
  );
}
