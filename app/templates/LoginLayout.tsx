import { Outlet } from "react-router";
import { AuthProvider } from "~/providers/AuthProvider";

export default function LoginLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
