import { BaseComponent } from "@/shared/types";
import clsx from "clsx";
import { buttonStyles } from "./styles";

export const Button: BaseComponent<{}, HTMLButtonElement> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={clsx(buttonStyles.root, className)} {...props}>
      {children}
    </button>
  );
};
