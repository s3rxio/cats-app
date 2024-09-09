import { appApi } from "@/shared/libs/http";
import { User } from "./model";

export type AuthUserDto = Pick<User, "login" | "password">;

export const authUser = async (dto: AuthUserDto) => {
  const res = await appApi.post<User>("/user", dto);

  return res;
};
