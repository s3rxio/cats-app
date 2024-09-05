import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { FavoritesPage } from "@/pages/favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "favorites",
    element: <FavoritesPage />,
  },
]);
