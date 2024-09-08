import { BaseComponent } from "@/shared/types";
import clsx from "clsx";
import { inputStyles } from "./styles";

export const Input: BaseComponent<{}, HTMLInputElement> = ({
  children,
  className,
  ...props
}) => {
  return (
    <input className={clsx(inputStyles.root, className)} {...props}>
      {children}
    </input>
  );
};
