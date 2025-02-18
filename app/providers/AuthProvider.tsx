// app/providers/AuthProvider.tsx
import { ReactNode, useEffect, useState, useMemo, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "~/contexts/AuthContext";
import { constants } from "config/constants";
import { useError } from "~/hooks/useError";
import { api } from "config/api";

interface DecodedToken {
  exp: number;
  // Puedes incluir otros campos si los usas
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { reportError } = useError();

  // Función para validar el token de forma inmediata
  const validateToken = useCallback(() => {
    const token = localStorage.getItem(constants.JWT_SECRET);
    if (!token) return false;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      // El token expira en segundos, por lo que lo convertimos a milisegundos
      if (decoded.exp * 1000 < Date.now()) {
        // Token expirado
        localStorage.removeItem(constants.JWT_SECRET);
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem(constants.JWT_SECRET);
      return false;
    }
  }, []);

  // En el montaje, verificamos la validez del token
  useEffect(() => {
    if (validateToken()) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [validateToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await fetch(`${api.AUTH_API}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Credenciales inválidas.");
        }

        const { token } = await response.json();
        localStorage.setItem(constants.JWT_SECRET, token);
        if (validateToken()) {
          setIsAuth(true);
        } else {
          throw new Error("Token inválido o expirado.");
        }
      } catch (error) {
        reportError({
          component: "AuthProvider.tsx",
          title: "Error al iniciar sesión",
          message: `${error}`,
          showInProd: true,
        });
        setIsAuth(false);
      }
    },
    [reportError, validateToken]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(constants.JWT_SECRET);
    setIsAuth(false);
  }, []);

  const contextValue = useMemo(() => ({ isAuth, login, logout }), [isAuth, login, logout]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
