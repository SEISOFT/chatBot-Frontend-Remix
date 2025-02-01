import { api } from "config/api";
import { constants } from "config/constants";
import { useState, ReactNode, useMemo, useEffect, useCallback } from "react";
import { UserContext, User } from "~/contexts/UserContext";
import { useError } from "~/hooks/useError";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const token = localStorage.getItem(constants.JWT_SECRET);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { reportError } = useError();

  const getUser = useCallback(
    async (token: string) => {
      try {
        const response = await fetch(`${api.CORE_API}/user/get-user`, {
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
        reportError({
          component: "UserProvider.tsx Ln.37",
          title: "Error al obtener usuario",
          message: `${error}`,
          showInProd: true,
        });
        localStorage.removeItem(constants.JWT_SECRET);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    },
    [reportError]
  );
  const refetchUser = useCallback(async () => {
    const token = localStorage.getItem(constants.JWT_SECRET);
    if (token) {
      await getUser(token);
    }
  }, [getUser]);

  const updateUser = useCallback(
    async (patch: Partial<User>) => {
      const merged = { ...user, ...patch };
      try {
        const response = await fetch(`${api.CORE_API}/user/update-user`, {
          method: "PUT",
          body: JSON.stringify(merged),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("JWT inválido");
        }
        refetchUser();
      } catch (error) {
        reportError({
          component: "userProvider.tsx Ln.69",
          title: "Error actualizar el usuario",
          message: `${error}`,
          showInProd: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [refetchUser, reportError, token, user]
  );

  useEffect(() => {
    if (token) {
      getUser(token);
    } else {
      setIsLoading(false);
    }
  }, [token, getUser]);

  const contextValue = useMemo(
    () => ({ user, setUser, isLoading, refetchUser, updateUser }),
    [user, isLoading, refetchUser, updateUser]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
