import { useNavigate } from "@remix-run/react";
import { Login } from "../components/organisms/Login";
import { useEffect } from "react";
import { useAuth } from "~/hooks/useAuth";

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("usuario logueado, redirigiendo a dashboard...");
      navigate("/dashboard"); // Redirigir al dashboard solo si el user no es null
    } else {
      console.log("no esta logueado");
      console.log(user);
    }
  }, [user, navigate]);

  return <Login />;
}
