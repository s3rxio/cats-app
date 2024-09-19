import { createContext, Dispatch, FC, SetStateAction } from "react";
import { AuthModal } from "./ui";

export interface UserContextValue {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;

  likes: string[];
  setLikes: Dispatch<SetStateAction<string[]>>;

  authModalIsOpen: boolean;
  setAuthModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextValue>(
  {} as UserContextValue
);

export interface UserProviderProps {
  children: React.ReactNode;
  value: UserContextValue;
}

export const UserProvider: FC<UserProviderProps> = ({ children, value }) => {
  return (
    <UserContext.Provider value={value}>
      <AuthModal
        isOpen={value.authModalIsOpen}
        setIsOpen={value.setAuthModalIsOpen}
      />

      {children}
    </UserContext.Provider>
  );
};
