import { useEffect } from "react";
import { useAuth } from "../model/hooks";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, startAuth } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      startAuth();
    }
  }, []);

  return !isAuthenticated ? "Auth required" : children;
};
