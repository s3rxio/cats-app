import { BaseComponent, BaseProps } from "@/shared/types";
import { CatCard, CatCardProps } from "../cat-card";
import { catsListStyles } from "./styles";
import clsx from "clsx";

export interface CatsListProps {
  cats: (BaseProps & CatCardProps)[];
  noElementsElement?: JSX.Element | string;
}

export const CatsList: BaseComponent<CatsListProps> = ({
  cats,
  className,
  style,
  noElementsElement,
  ...props
}) => {
  if (cats.length < 1) {
    return (
      <div className={className} style={style} {...props}>
        {noElementsElement}
      </div>
    );
  }

  return (
    <div className={clsx(catsListStyles.root, className)} {...props}>
      {cats.map((cat, index) => (
        <CatCard key={index} className={catsListStyles.item} {...cat} />
      ))}
    </div>
  );
};
