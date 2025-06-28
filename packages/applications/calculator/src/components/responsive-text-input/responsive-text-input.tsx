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
        "placeholder:text-gray-500",
        "outline-none",
        "border",
        "px-4",
        "py-2",
        "sm:py-3",
        "md:py-4",
        "lg:py-6",
        "bold-font:font-bold",
        "theme-light:bg-neutral-100",
        "theme-light:border-neutral-400",
        "theme-dark:bg-neutral-800",
        "theme-dark:border-neutral-500",
        props.className,
      )}
    />
  );
});
