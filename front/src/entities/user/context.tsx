import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { USER_TOKEN_KEY } from "./consts";
import { appApi } from "@/shared/libs/http";

export interface UserContextValue<T = string | null, F = string[]> {
  token: T;
  setToken: Dispatch<SetStateAction<T>>;

  favorites: F;
  setFavorites: Dispatch<SetStateAction<F>>;
}

export const UserContext = createContext<UserContextValue>(
  {} as UserContextValue
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<UserContextValue["token"]>(
    localStorage.getItem(USER_TOKEN_KEY)
  );
  const [favorites, setFavorites] = useState<UserContextValue["favorites"]>([]);

  useEffect(() => {
    if (!token) {
      setFavorites([]);
      return;
    }

    localStorage.setItem(USER_TOKEN_KEY, token || "");
    appApi.defaults.headers.common["x-auth-token"] = token || "";
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
