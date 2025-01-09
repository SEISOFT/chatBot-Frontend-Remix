import { useContext } from "react";
import { UserContext } from "~/contexts/UserContext";


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
