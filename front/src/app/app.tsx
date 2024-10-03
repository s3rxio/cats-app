import { Router } from "./router";
import { TOKEN_KEY } from "@/shared/storage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api";
import { AuthProvider } from "@/features/auth";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider token={localStorage.getItem(TOKEN_KEY)}>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
};
