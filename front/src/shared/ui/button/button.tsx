import clsx from "clsx";
import { buttonStyles } from "./styles";
import { ButtonHTMLAttributes, forwardRef, memo } from "react";

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
};

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ children, className, ...props }, ref) => {
      return (
        <button
          ref={ref}
          className={clsx(buttonStyles.root, className)}
          {...props}
        >
          {children}
        </button>
      );
    }
  )
);
