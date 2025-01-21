import { api } from "config/api";
import { constants } from "config/constants";
import { ReactNode, useMemo, useCallback, useState, useEffect } from "react";
import { AuthContext } from "~/contexts/AuthContext";
import { useError } from "~/hooks/useError";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { reportError } = useError();
  useEffect(() => {
    const token = localStorage.getItem(constants.JWT_SECRET);
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await fetch(`${api.API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Credenciales inválidas.");
        }

        const { token } = await response.json();
        localStorage.setItem(constants.JWT_SECRET, token);
        setIsAuth(true);
      } catch (error) {
        reportError({
          component: "AuthProvider.tsx Ln.39",
          title: "Error al iniciar sesión",
          message: `${error}`,
          showInProd: true,
        });
      }
    },
    [reportError]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(constants.JWT_SECRET);
    setIsAuth(false);
  }, []);

  const contextValue = useMemo(
    () => ({ isAuth, login, logout }),
    [isAuth, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
