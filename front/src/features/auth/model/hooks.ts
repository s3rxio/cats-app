import { TOKEN_KEY } from "@/shared/storage";
import { useContext } from "react";
import { AuthContext } from "./context";

export const useAuth = () => {
  const {
    token,
    setToken,
    isAuthenticated,
    setIsAuthenticated,
    setIsAuthenticating,
    isAuthenticating,
  } = useContext(AuthContext);

  return {
    token,
    isAuthenticated,
    startAuth: () => {
      if (!isAuthenticating) {
        setIsAuthenticating(true);
      }

      return;
    },
    auth: (token: string) => {
      if (!token) throw new Error("No token provided");

      localStorage.setItem(TOKEN_KEY, token);
      setToken(token);

      setIsAuthenticated(true);
    },
    logout: () => {
      if (!token) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }

      setIsAuthenticated(false);
    },
  };
};
