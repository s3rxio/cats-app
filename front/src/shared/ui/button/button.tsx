import { BaseComponent } from "@/shared/types";
import clsx from "clsx";
import { buttonStyles } from "./styles";

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
};

export const Button: BaseComponent<ButtonProps, HTMLButtonElement> = ({
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
