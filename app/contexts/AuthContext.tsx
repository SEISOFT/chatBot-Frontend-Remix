import { createContext } from "react";

export interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuth: boolean
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
