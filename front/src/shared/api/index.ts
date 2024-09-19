import { QueryClient } from "@tanstack/react-query";
export * from "./app";
export * from "./cat";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});
