import { NavigationProvider } from "~/providers/NavigationProvider";
import { AuthProvider } from "~/providers/AuthProvider"; // Importa el AuthProvider
import { Outlet } from "@remix-run/react";
import { UserProvider } from "~/providers/UserProvider";
import { Sidebar } from "~/components/molecules/navigation/SideBar";
import { Navbar } from "~/components/molecules/navigation/Navbar";
import { Box, Flex } from "@chakra-ui/react";

export default function DashboardLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <NavigationProvider>
          <Box>
            <Navbar />
            <Flex>
              <Sidebar />
              <Outlet />
            </Flex>
          </Box>
        </NavigationProvider>
      </UserProvider>
    </AuthProvider>
  );
}
