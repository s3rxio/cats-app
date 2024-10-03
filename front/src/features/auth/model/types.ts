import { Dispatch, ReactNode, SetStateAction } from "react";

export interface AuthContextValue<Token = string | null> {
  token?: Token;
  setToken: Dispatch<SetStateAction<Token>>;

  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;

  isAuthenticating: boolean;
  setIsAuthenticating: Dispatch<SetStateAction<boolean>>;
}

export interface AuthProviderProps {
  children?: ReactNode;
  token?: string | null;
}
