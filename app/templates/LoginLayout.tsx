import { Outlet } from "@remix-run/react";
import { AuthProvider } from "~/providers/AuthProvider";

export default function LoginLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
