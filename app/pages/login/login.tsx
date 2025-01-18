import { useNavigate } from "@remix-run/react";
import { useAuth } from "~/hooks/useAuth";
import { Login } from "../../components/organisms/Login";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isAuth", isAuth)
    if (isAuth) {
      console.log("Usuario logueado, redirigiendo a dashboard...");
      navigate("/dashboard", { replace: true });
    }
  }, [isAuth, navigate]);

  return <Login />;
}
