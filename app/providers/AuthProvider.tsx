import { config } from "config";
import { ReactNode, useEffect, useMemo, useCallback } from "react";
import { AuthContext } from "~/contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
  onAuthSuccess: (token: string) => void; // Notificar al UserProvider
}

export const AuthProvider = ({ children, onAuthSuccess }: AuthProviderProps) => {
  // Validar el token JWT almacenado
  useEffect(() => {
    const token = localStorage.getItem(config.JWT_SECRET);
    if (token) {
      onAuthSuccess(token); // Notificar al UserProvider que el usuario está autenticado
    }
  }, [onAuthSuccess]);

  // Función de inicio de sesión
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${config.API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas.");
      }

      const { token } = await response.json();
      localStorage.setItem(config.JWT_SECRET, token);

      onAuthSuccess(token); // Notificar al UserProvider
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  }, [onAuthSuccess]);

  // Función de cierre de sesión
  const logout = useCallback(() => {
    localStorage.removeItem(config.JWT_SECRET);
    localStorage.removeItem("email");
  }, []);

  // Memoizar el valor del contexto
  const contextValue = useMemo(
    () => ({ login, logout }),
    [login, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
