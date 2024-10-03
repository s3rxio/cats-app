import clsx from "clsx";
import { catCardStyles } from "./styles";
import { HeartFilledIcon, HeartIcon, BaseComponent } from "@/shared/ui";
import { memo, useState } from "react";
import { appQueries } from "@/shared/api";
import { useAuth } from "@/features/auth";

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
    const { token, startAuth } = useAuth();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLiked, setIsLiked] = useState(isLikedProp || false);
    const { mutateAsync: addLike } =
      appQueries.likesQueries.useAddLikeMutation();
    const { mutateAsync: removeLike } =
      appQueries.likesQueries.useRemoveLikeMutation();

    const handleLike: React.ChangeEventHandler<HTMLInputElement> = async (
      ev
    ) => {
      ev.stopPropagation();

      if (!token) {
        startAuth();
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
      } catch (error: any) {
        console.log(error);
        if (error?.response?.status === 401) {
          startAuth();
          return;
        }
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
