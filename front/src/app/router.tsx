import {
  BrowserRouter,
  Outlet,
  // createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { HomePage } from "@/pages/home";
import { LikesPage } from "../pages/likes";
import { AuthGuard } from "@/features/auth";
import { Layout } from "@/shared/ui";

// TODO: Add lazy routes

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="*" element={<HomePage />} />
        <Route
          path="likes"
          element={
            <AuthGuard>
              <LikesPage />
            </AuthGuard>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
