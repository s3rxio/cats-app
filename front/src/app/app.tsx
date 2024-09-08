import { RouterProvider } from "react-router-dom";
import { router } from "../pages";
import { UserProvider } from "@/entities/user";

export const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};
