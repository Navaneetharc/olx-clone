import { useContext } from "react";
import { AuthContext } from "./auth-context";

export const UserAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
