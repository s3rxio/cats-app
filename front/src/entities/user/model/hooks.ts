import { useContext } from "react";
import { UserContext } from "./context";
import { USER_TOKEN_KEY } from "@/shared/configs";

export const useAuthModal = () => {
  const { authModalIsOpen, setAuthModalIsOpen } = useContext(UserContext);

  const openAuthModal = () => setAuthModalIsOpen(true);

  return { authModalIsOpen, setAuthModalIsOpen, openAuthModal };
};

export const useAuth = () => {
  const { token, setToken } = useToken();

  const auth = (token: string) => {
    setToken(token);
    localStorage.setItem(USER_TOKEN_KEY, token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(USER_TOKEN_KEY);
  };

  return { token, auth, logout };
};

export const useToken = () => {
  const { token, setToken } = useContext(UserContext);

  return { token, setToken };
};

export const useLikes = () => {
  const { likes, setLikes } = useContext(UserContext);

  return { likes, setLikes };
};
