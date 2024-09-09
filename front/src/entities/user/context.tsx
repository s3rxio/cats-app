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

  likes: F;
  setLikes: Dispatch<SetStateAction<F>>;
}

export const UserContext = createContext<UserContextValue>(
  {} as UserContextValue
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<UserContextValue["token"]>(
    localStorage.getItem(USER_TOKEN_KEY)
  );
  const [likes, setLikes] = useState<UserContextValue["likes"]>([]);

  useEffect(() => {
    if (!token) {
      setLikes([]);
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
        likes,
        setLikes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
