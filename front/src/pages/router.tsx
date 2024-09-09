import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { LikesPage } from "./likes";

// TODO: Add lazy routes

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "likes",
    element: <LikesPage />,
  },
]);
