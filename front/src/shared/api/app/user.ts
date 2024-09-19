import { appApiInstance } from "./instance";
import { AuthUserDto, User } from "./types";

const authUser = async (dto: AuthUserDto) => {
  return appApiInstance.post<User>("/user", dto);
};

export const user = {
  authUser,
};
