import { useAuth } from "~/hooks/useAuth";
import { RegisterForm } from "../components/molecules/RegisterForm";
import { useNavigate } from "@remix-run/react";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    login(email.value, "2123213");
    navigate("/dashboard");
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}
