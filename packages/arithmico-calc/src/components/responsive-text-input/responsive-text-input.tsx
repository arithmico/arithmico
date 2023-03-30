import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";

export const ResponsiveTextInput = forwardRef<
  HTMLInputElement,
  HTMLProps<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      type={props.type ?? "text"}
      className={classNames(
        "w-full",
        "text-xl",
        "sm:text-2xl",
        "md:text-3xl",
        "lg:text-4xl",
        "outline-none",
        "border",
        "px-4",
        "py-2",
        "sm:py-3",
        "md:py-4",
        "lg:py-6",
        "rounded-md",
        "bold-font:font-bold",
        props.className
      )}
    />
  );
});
