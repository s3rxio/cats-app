import { appApiInstance } from "./instance";
import { Like } from "./types";

const fetchLikes = () => {
  return appApiInstance.get<Like[]>("/likes");
};

const addLike = (id: string) => {
  return appApiInstance.post<Like>(`/likes`, {
    catId: id,
  });
};

const removeLike = (id: string) => {
  return appApiInstance.delete<null>(`/likes/${id}`);
};

export const likes = {
  fetchLikes,
  addLike,
  removeLike,
};
