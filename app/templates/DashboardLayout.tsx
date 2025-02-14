import { useBreakpointValue, Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { Navbar } from "~/components/organisms/navigation/Navbar";
import { Sidebar } from "~/components/organisms/navigation/SideBar";
import { useNavigation } from "~/hooks/useNavigation";
import { AuthProvider } from "~/providers/AuthProvider";
import { NavigationProvider } from "~/providers/NavigationProvider";
import { UserProvider } from "~/providers/UserProvider";
import backgroundBodyAdmin from "~/assets/images/background-body-admin.webp";

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
    if (isSidebarCollapsed) return "74px";
    if (isMobile) return "314px";
    return "256px";
  };

  const sidebarWidth = getSidebarWidth();
  const navbarHeight = "50px";

  return (
    <Box bgImage={backgroundBodyAdmin}>
      <Sidebar />
      <Navbar />

      {/* Contenido principal que se desplaza en scroll */}
      <Box
        transition="width 0.4s"
        as="main"
        position="relative"
        ml={isMobile ? 0 : sidebarWidth}
        pt={navbarHeight}
        minHeight="calc(100vh )"
        overflow="hidden"
      >
        <Outlet />
      </Box>
    </Box>
  );
}
