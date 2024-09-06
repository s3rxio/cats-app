import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { Layout } from "@/shared/ui";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "favorites",
        element: <HomePage />,
      },
    ],
  },
]);
