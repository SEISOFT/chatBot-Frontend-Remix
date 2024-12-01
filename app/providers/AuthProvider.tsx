import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "~/contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const email = localStorage.getItem("email");
      if (email) {
        setUser({ email });
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:4001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(
          "Error al iniciar sesión. Por favor, verifica tus credenciales."
        );
      }

      const data = await response.json();
      const { token } = data;

      localStorage.setItem("jwt", token);
      localStorage.setItem("email", email);
      setUser({ email });
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
