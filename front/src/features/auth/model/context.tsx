import { createContext, FC, useState } from "react";
import { AuthContextValue, AuthProviderProps } from "./types";
import { AuthModal } from "../ui/auth-modal";

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  token: providedToken,
}) => {
  const [token, setToken] = useState<string | null>(providedToken || null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!providedToken
  );
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        isAuthenticating,
        setIsAuthenticating,
      }}
    >
      {<AuthModal isOpen={isAuthenticating} setIsOpen={setIsAuthenticating} />}
      {children}
    </AuthContext.Provider>
  );
};
