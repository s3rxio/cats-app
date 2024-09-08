import { BaseComponent } from "@/shared/types";
import clsx from "clsx";
import { catCardStyles } from "./styles";
import { HeartFilledIcon, HeartIcon } from "@/shared/ui/icons";
import { useEffect, useState } from "react";

export interface CatCardProps {
  id: string;
  imageUrl: string;
  isFavorite?: boolean;
  onLike?: (id: string, setIsFavorite: (prev: boolean) => void) => void;
}

export const CatCard: BaseComponent<CatCardProps> = ({
  id,
  imageUrl,
  isFavorite = false,
  onLike,
  className,
  onClick,
  ...props
}) => {
  const [catIsFavorite, setCatIsFavorite] = useState(isFavorite);
  const [isDisabled, setIsDisabled] = useState(false);

  const changeFavorite = (ev: any) => {
    if (onClick) {
      onClick(ev);
    }
    if (isDisabled) {
      return;
    }
    setIsDisabled(true);
    if (onLike) {
      onLike(id, setCatIsFavorite);
    } else {
      setCatIsFavorite(!catIsFavorite);
    }

    setIsDisabled(false);
  };

  return (
    <div
      className={clsx(
        catCardStyles.root,
        catIsFavorite && catCardStyles.isFavorite,
        className
      )}
      onClick={changeFavorite}
      {...props}
    >
      <img src={imageUrl} alt="cat" className={catCardStyles.image} />
      <div className={catCardStyles.favorite}>
        <div className={catCardStyles.checkbox}>
          <HeartIcon className={catCardStyles.checkboxIcon} />
          <HeartFilledIcon
            className={clsx(
              catCardStyles.checkboxIcon,
              catCardStyles.checkboxIconFavorite
            )}
          />
          <input
            type="checkbox"
            checked={catIsFavorite}
            onChange={changeFavorite}
            className={catCardStyles.checkboxInput}
          />
        </div>
      </div>
    </div>
  );
};
