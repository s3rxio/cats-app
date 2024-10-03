import { BaseComponent } from "@/shared/ui";
import { catsListStyles } from "./styles";
import clsx from "clsx";
import { useEffect } from "react";
import { CatCard, CatCardProps } from "../cat-card";

export interface CatsListProps {
  cats?: CatCardProps[];
  onReachEnd?: () => void;
  isFetching?: boolean;
  error?: string;
}

export const CatsList: BaseComponent<CatsListProps> = ({
  cats,
  className,
  style,
  onReachEnd,
  isFetching,
  error,
  ...props
}) => {
  const handleScroll = () => {
    const threshold = 5;
    const scrolledTo = window.innerHeight + window.scrollY;
    const bottom = document.body.scrollHeight - threshold;

    const isBottom = scrolledTo >= bottom;

    if (!isBottom || !onReachEnd) return;

    onReachEnd();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onReachEnd]);

  return (
    <div className={clsx(catsListStyles.root, className)} {...props}>
      {!isFetching && (!cats || cats.length < 1) ? (
        <div className={clsx(catsListStyles.noCats, catsListStyles.full)}>
          Котиков нет
        </div>
      ) : (
        cats?.map((cat, index) => (
          <CatCard
            key={index}
            {...cat}
            className={catsListStyles.item}
            isLiked={cat.isLiked}
          />
        ))
      )}

      <div
        className={clsx(
          catsListStyles.request,
          catsListStyles.full,
          (isFetching || error) && catsListStyles.requestVisible
        )}
      >
        {!error ? (
          <div className={catsListStyles.requestFething}>
            ... загружаем еще котиков ...
          </div>
        ) : (
          <div className={catsListStyles.requestError}>{error}</div>
        )}
      </div>
    </div>
  );
};
