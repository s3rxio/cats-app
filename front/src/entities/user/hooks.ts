import { useContext } from "react";
import { UserContext } from "./context";

export const useAuthModal = () => {
  const { authModalIsOpen, setAuthModalIsOpen } = useContext(UserContext);

  const openAuthModal = () => setAuthModalIsOpen(true);

  return { authModalIsOpen, setAuthModalIsOpen, openAuthModal };
};
