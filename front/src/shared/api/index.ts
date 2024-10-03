import { QueryClient } from "@tanstack/react-query";

export * from "./app/types";
export { appApi, appQueries } from "./app";

export * from "./cat/types";
export { catApi, catQueries } from "./cat";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});
