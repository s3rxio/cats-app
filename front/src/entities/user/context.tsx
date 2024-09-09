import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { USER_TOKEN_KEY } from "./consts";
import { fetchLikes } from "../cat";
import { AuthModal } from "./ui";

export interface UserContextValue<T = string | null, F = string[]> {
  token: T;
  setToken: Dispatch<SetStateAction<T>>;

  likes: F;
  setLikes: Dispatch<SetStateAction<F>>;

  authModalIsOpen: boolean;
  setAuthModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextValue>(
  {} as UserContextValue
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<UserContextValue["token"]>(
    localStorage.getItem(USER_TOKEN_KEY)
  );
  const [likes, setLikes] = useState<UserContextValue["likes"]>([]);
  const [authModalIsOpen, setAuthModalIsOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      setLikes([]);
      return;
    }

    localStorage.setItem(USER_TOKEN_KEY, token);
    fetchLikes().then((cats) => setLikes(cats.map(({ catId }) => catId)));
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        likes,
        setLikes,
        authModalIsOpen,
        setAuthModalIsOpen,
      }}
    >
      <AuthModal isOpen={authModalIsOpen} setIsOpen={setAuthModalIsOpen} />

      {children}
    </UserContext.Provider>
  );
};
