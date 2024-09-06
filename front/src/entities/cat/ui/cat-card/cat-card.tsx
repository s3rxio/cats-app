import { BaseComponent } from "@/shared/types";
import clsx from "clsx";
import { catCardStyles } from "./styles";
import { HeartFilledIcon, HeartIcon } from "@/shared/ui/icons";
import { useState } from "react";

export interface CatCardProps {
  imageUrl: string;
  isFavorite?: boolean;
}

export const CatCard: BaseComponent<CatCardProps> = ({
  imageUrl,
  isFavorite = false,
  className,
  onClick,
  ...props
}) => {
  const [catIsFavorite, setCatIsFavorite] = useState(isFavorite);

  const changeFavorite = (ev: any) => {
    if (onClick) {
      onClick(ev);
    }

    setCatIsFavorite(!catIsFavorite);
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
