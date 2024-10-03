import { appApi, AppApiAxiosError, AuthUserDto, User } from "@/shared/api";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const AUTH_QUERY_KEY = "auth";

export const useAuthMutation = (
  options?: UseMutationOptions<
    AxiosResponse<User, any>,
    AppApiAxiosError,
    AuthUserDto
  >
) => {
  return useMutation({
    ...options,
    mutationKey: [AUTH_QUERY_KEY, "auth"],
    mutationFn: appApi.user.authUser,
  });
};
