import { useNavigate } from "@remix-run/react";
import { Login } from "../../components/organisms/Login";
import { useEffect } from "react";
import { useUser } from "~/hooks/useUser";

export default function LoginPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Usuario logueado, redirigiendo a dashboard...");
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <Login />;
}
