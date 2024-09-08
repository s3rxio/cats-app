import { appApi } from "@/shared/libs/http";
import { User } from "./model";

export type AuthUserDto = Pick<User, "login" | "password">;

export const authUser = async (dto: AuthUserDto) => {
  const res = await appApi.post<User>("/user", dto);

  return res;
};

export const fetchLikes = async () => {
  const res = await appApi.get<{ catId: string }[]>("/likes");

  return res.data;
};

export const addLike = async (catId: string) => {
  const res = await appApi.post(`/likes`, {
    catId,
  });

  return res.data;
};

export const removeLike = async (catId: string) => {
  return await appApi.delete(`/likes/${catId}`);
};
