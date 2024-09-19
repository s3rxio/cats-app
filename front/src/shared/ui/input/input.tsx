import clsx from "clsx";
import { inputStyles } from "./styles";
import { forwardRef, InputHTMLAttributes, memo } from "react";

export const Input = memo(
  forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ value, onChange, className, ...props }, ref) => {
      return (
        <input
          ref={ref}
          className={clsx(inputStyles.root, className)}
          value={value}
          onChange={onChange}
          {...props}
        />
      );
    }
  )
);
