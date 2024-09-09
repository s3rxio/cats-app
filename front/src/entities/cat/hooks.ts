import { useContext } from "react";
import { UserContext } from "../user";
import { dislikeCat, likeCat } from "./api";

export const useLikes = () => {
  const { likes, setLikes } = useContext(UserContext);

  const addLike = async (id: string) => {
    await likeCat(id);

    setLikes([...likes, id]);
  };

  const removeLike = async (id: string) => {
    await dislikeCat(id);

    setLikes(likes.filter((like) => like !== id));
  };

  const like = async (id: string) => {
    if (likes.includes(id)) {
      await removeLike(id);
      return;
    }

    await addLike(id);
  };

  return { likes, setLikes, like, addLike, removeLike };
};
