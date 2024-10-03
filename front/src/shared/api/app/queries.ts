import { appApi, AppApiAxiosError, Like } from "@/shared/api";
import {
  queryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const LIKES_QUERY_KEY = "likes";

const useAddLikeMutation = (
  options?: UseMutationOptions<
    AxiosResponse<Like, any>,
    AppApiAxiosError,
    string
  >
) => {
  return useMutation({
    ...options,
    mutationKey: [LIKES_QUERY_KEY, "add"],
    mutationFn: appApi.likes.addLike,
  });
};

const useRemoveLikeMutation = (
  options?: UseMutationOptions<
    AxiosResponse<null, any>,
    AppApiAxiosError,
    string
  >
) => {
  return useMutation({
    ...options,
    mutationKey: [LIKES_QUERY_KEY, "remove"],
    mutationFn: appApi.likes.removeLike,
  });
};

const getLikesQuery = () =>
  queryOptions({
    queryKey: [LIKES_QUERY_KEY],
    queryFn: () => appApi.likes.fetchLikes(),
  });

export const likesQueries = {
  getLikesQuery,
  useAddLikeMutation,
  useRemoveLikeMutation,
};
