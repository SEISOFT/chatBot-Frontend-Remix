import { createContext } from "react";
import { Profiling } from "~/components/organisms/profiling/types";

export interface User {
  username: string;
  email: string;
  password?: string;
  phone: string;
  country?: string;
  province?: string;
  city?: string;
  address?: string;
  type_of_document?: string;
  document_number?: string;
  plan?: string;
  profile?: Profiling;
}

export interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean;
  refetchUser: () => void;
  updateUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);
