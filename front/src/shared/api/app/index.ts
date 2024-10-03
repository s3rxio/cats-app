import { user } from "./user";
import { likes } from "./likes";
import { likesQueries } from "./queries";

export * from "./types";
export const appApi = {
  user,
  likes,
};

export const appQueries = {
  likesQueries,
};
