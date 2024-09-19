import { RouterProvider } from "react-router-dom";
import { router } from "../pages";
import { UserContextValue, UserProvider } from "@/entities/user";
import { USER_TOKEN_KEY } from "@/shared/consts";
import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api";
import { appApi } from "@/shared/api/app";
import { AxiosError } from "axios";

export const App = () => {
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
    queryClient
      .fetchQuery({
        queryKey: ["likes"],
        queryFn: () => appApi.likes.fetchLikes(),
      })
      .then((res) => setLikes(res.data.map((like) => like.catId)))
      .catch((error: AxiosError) => {
        if (error.status !== 401) return;

        setToken(null);
        localStorage.removeItem(USER_TOKEN_KEY);
        setAuthModalIsOpen(true);
      });
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider
        value={{
          token,
          setToken,
          likes,
          setLikes,
          authModalIsOpen,
          setAuthModalIsOpen,
        }}
      >
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  );
};
