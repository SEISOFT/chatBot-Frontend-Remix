import { useState, useCallback } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { TbEyeClosed, TbEye } from "react-icons/tb";
import { useAuth } from "~/hooks/useAuth";

interface LoginFormProps {
  onSuccess: () => void; // callback para manejar redirección o lógica en el componente Login
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Para manejar visibilidad de la contraseña
  const [isLoading, setIsLoading] = useState(false); // Para manejar el estado de carga
  // Toggle visibility function using useCallback to prevent unnecessary re-creations
  const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      onSuccess();
    } catch (error) {
      console.error(error || "Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <Stack spacing={4} minWidth={"320px"}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduce tu email"
            isRequired
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={isVisible ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              isRequired
            />
            <InputRightElement>
              <IconButton
                aria-label="Toggle password visibility"
                icon={isVisible ? <TbEye /> : <TbEyeClosed />}
                onClick={toggleVisibility}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button variant={"link"} fontSize="sm" alignSelf="flex-end">
          ¿Olvidaste tu contraseña?
        </Button>

        <Button
          type="submit"
          variant={"primary"}
          colorScheme="blue"
          isLoading={isLoading}
        >
          Inicia sesión
        </Button>
      </Stack>
    </Form>
  );
};
