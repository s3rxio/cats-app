import { BaseComponent } from "@/shared/types";
import clsx from "clsx";
import { catCardStyles } from "./styles";
import { HeartFilledIcon, HeartIcon } from "@/shared/ui/icons";
import { useState } from "react";

export interface CatCardProps {
  id: string;
  imageUrl: string;
  isLiked?: boolean;
  onLike?: (id: string, setIsLiked: (prev: boolean) => void) => void;
}

export const CatCard: BaseComponent<CatCardProps> = ({
  id,
  imageUrl,
  isLiked = false,
  onLike,
  className,
  onClick,
  ...props
}) => {
  const [catIsLiked, setCatIsLiked] = useState(isLiked);
  const [isDisabled, setIsDisabled] = useState(false);

  const changeLike = (ev: any) => {
    if (onClick) {
      onClick(ev);
    }
    if (isDisabled) {
      return;
    }
    setIsDisabled(true);
    if (onLike) {
      onLike(id, setCatIsLiked);
    } else {
      setCatIsLiked(!catIsLiked);
    }

    setIsDisabled(false);
  };

  return (
    <div
      className={clsx(
        catCardStyles.root,
        catIsLiked && catCardStyles.isLiked,
        className
      )}
      onClick={changeLike}
      {...props}
    >
      <img src={imageUrl} alt="cat" className={catCardStyles.image} />
      <div className={catCardStyles.like}>
        <div className={catCardStyles.checkbox}>
          <HeartIcon className={catCardStyles.checkboxIcon} />
          <HeartFilledIcon
            className={clsx(
              catCardStyles.checkboxIcon,
              catCardStyles.checkboxIconActive
            )}
          />
          <input
            type="checkbox"
            checked={catIsLiked}
            onChange={changeLike}
            className={catCardStyles.checkboxInput}
          />
        </div>
      </div>
    </div>
  );
};
