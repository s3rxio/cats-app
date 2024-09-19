import clsx from "clsx";
import { catCardStyles } from "./styles";
import { HeartFilledIcon, HeartIcon, BaseComponent } from "@/shared/ui";
import { memo, useState } from "react";
import {
  useAuthModal,
  useToken,
  useAddLikeMutation,
  useRemoveLikeMutation,
} from "@/entities/user";

export type OnLikeHandler<T = void> = (
  id: string,
  isLiked: boolean,
  setIsLiked: (prev: boolean) => void
) => T | Promise<T>;

export interface CatCardProps {
  id: string;
  imageUrl: string;
  isLiked?: boolean;
  onLike?: OnLikeHandler;
}

export const CatCard: BaseComponent<CatCardProps> = memo(
  ({
    id,
    imageUrl,
    onLike,
    className,
    onChange,
    isLiked: isLikedProp,
    ...props
  }) => {
    const { token } = useToken();
    const { openAuthModal } = useAuthModal();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLiked, setIsLiked] = useState(isLikedProp || false);
    const { mutateAsync: addLike } = useAddLikeMutation();
    const { mutateAsync: removeLike } = useRemoveLikeMutation();

    const handleLike: React.ChangeEventHandler<HTMLInputElement> = async (
      ev
    ) => {
      ev.stopPropagation();

      if (!token) {
        openAuthModal();
        return;
      }

      setIsDisabled(true);

      try {
        if (isLiked) {
          await removeLike(id);
          setIsLiked(false);
        } else {
          await addLike(id);
          setIsLiked(true);
        }
      } catch (error) {
        console.log(error);
      }

      setIsDisabled(false);
    };

    return (
      <div
        className={clsx(
          catCardStyles.root,
          isLiked && catCardStyles.isLiked,
          className
        )}
        {...props}
      >
        <div className={catCardStyles.imageBox}>
          <img
            src={imageUrl}
            alt="cat"
            className={catCardStyles.imageBoxImage}
          />
        </div>
        <div className={catCardStyles.like}>
          <HeartIcon className={catCardStyles.likeIcon} />
          <HeartFilledIcon
            className={clsx(
              catCardStyles.likeIcon,
              catCardStyles.likeIconIsActive
            )}
          />
        </div>
        <div className={catCardStyles.checkbox}>
          <input
            type="checkbox"
            disabled={isDisabled}
            checked={isLiked}
            onChange={onChange || handleLike}
            className={catCardStyles.checkboxInput}
          />
        </div>
      </div>
    );
  }
);
