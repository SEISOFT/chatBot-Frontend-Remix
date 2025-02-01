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

  // Ajusta el ancho del sidebar según estado
  const sidebarWidth = isSidebarCollapsed ? "70px" : "248px";
  // En móvil, podrías decidir colapsarlo u ocultarlo completamente
  // o consultarlo con el hook, tu lógica.

  // Altura del navbar en px
  const navbarHeight = "60px";

  return (
    <Box>
      <Box px={2}>
        <Sidebar />
      </Box>
      <Box px={2}>
        <Navbar />
      </Box>

      {/* Contenido principal que se desplaza en scroll */}
      <Box
        as="main"
        position="relative"
        ml={isMobile ? 0 : sidebarWidth}
        mt={navbarHeight}
        p={4}
        minHeight="calc(100vh - 60px)"
      >
        <Outlet />
      </Box>
    </Box>
  );
}
