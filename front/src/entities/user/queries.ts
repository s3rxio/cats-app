import {
  appApi,
  AppApiAxiosError,
  AuthUserDto,
  Like,
  User,
} from "@/shared/api/app";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const USER_QUERY_KEY = "user";
export const LIKES_QUERY_KEY = "likes";

export const useAuthMutation = (
  options?: UseMutationOptions<
    AxiosResponse<User, any>,
    AppApiAxiosError,
    AuthUserDto
  >
) => {
  return useMutation({
    ...options,
    mutationKey: [USER_QUERY_KEY],
    mutationFn: appApi.user.authUser,
  });
};

export const useAddLikeMutation = (
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

export const useRemoveLikeMutation = (
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

export const useLikesQuery = (
  options?: Omit<UseQueryOptions<AxiosResponse<Like[]>>, "queryFn" | "queryKey">
) => {
  return useQuery({
    queryKey: [LIKES_QUERY_KEY],
    queryFn: () => appApi.likes.fetchLikes(),
    ...options,
  });
};
