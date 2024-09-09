import { BaseComponent } from "@/shared/types";
import clsx from "clsx";
import { catCardStyles } from "./styles";
import { HeartFilledIcon, HeartIcon } from "@/shared/ui/icons";
import { useEffect, useState } from "react";
import { useLikes } from "../../hooks";

export interface CatCardProps {
  id: string;
  imageUrl: string;
  isLiked?: boolean;
}

export const CatCard: BaseComponent<CatCardProps> = ({
  id,
  imageUrl,
  isLiked = false,
  className,
  onChange,
  ...props
}) => {
  const { likes, like } = useLikes();
  const [catIsLiked, setCatIsLiked] = useState(isLiked || likes.includes(id));
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLike: React.ChangeEventHandler<HTMLInputElement> = async (ev) => {
    ev.stopPropagation();
    setIsDisabled(true);

    try {
      await like(id);

      setCatIsLiked(!catIsLiked);
    } catch (error) {
      console.log(error);
    }

    setIsDisabled(false);
  };

  useEffect(() => {
    setCatIsLiked(isLiked || likes.includes(id));
  }, [likes]);

  return (
    <div
      className={clsx(
        catCardStyles.root,
        catIsLiked && catCardStyles.isLiked,
        className
      )}
      {...props}
    >
      <div className={catCardStyles.imageBox}>
        <img src={imageUrl} alt="cat" className={catCardStyles.imageBoxImage} />
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
          checked={catIsLiked}
          onChange={onChange || handleLike}
          className={catCardStyles.checkboxInput}
        />
      </div>
    </div>
  );
};
