import { useState, ReactNode, useMemo } from "react";
import { UserContext, User } from "~/contexts/UserContext";
import { AuthProvider } from "./AuthProvider";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Función para manejar el éxito de autenticación
  const handleAuthSuccess = (token: string) => {
    // Aquí podrías hacer una petición a tu API para obtener más información del usuario
    console.log(token)
    setUser({
      username: "newUser",
      email:"test@test.com",
      password: "*****",
      phone: "123456789",
    });
  };

  const contextValue = useMemo(
    () => ({ user, setUser }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValue}>
      <AuthProvider onAuthSuccess={handleAuthSuccess}>
        {children}
      </AuthProvider>
    </UserContext.Provider>
  );
};
