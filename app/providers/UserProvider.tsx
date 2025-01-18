import { api } from "config/api";
import { constants } from "config/constants";
import { useState, ReactNode, useMemo, useEffect, useCallback } from "react";
import { UserContext, User } from "~/contexts/UserContext";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUser = useCallback(async (token: string) => {
    try {
      console.log("Token encontrado:", token);
      const response = await fetch(`${api.CORE_URL}/user/get-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("JWT inválido");
      }

      const { user } = await response.json();
      setUser(user);
      console.log("Usuario obtenido:", user);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      localStorage.removeItem(constants.JWT_SECRET);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(constants.JWT_SECRET);
    if (token) {
      getUser(token);
    } else {
      console.log("No hay un token autenticado");
      setIsLoading(false);
    }
  }, [getUser]);

  const contextValue = useMemo(
    () => ({ user, setUser, isLoading }),
    [user, isLoading]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
