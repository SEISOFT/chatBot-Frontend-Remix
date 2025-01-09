import { NavigationProvider } from "~/providers/NavigationProvider";
import { Outlet } from "@remix-run/react";
import { UserProvider } from "~/providers/UserProvider";

export default function DashboardLayout() {
  return (
    <UserProvider>
      <NavigationProvider>
        <Outlet />
      </NavigationProvider>
    </UserProvider>
  );
}
