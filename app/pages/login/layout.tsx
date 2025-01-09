import { Outlet } from "@remix-run/react";
import { UserProvider } from "~/providers/UserProvider";

export default function LoginLayout() {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
}
