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
        "rounded-sm",
        "bold-font:font-bold",
        "focus:outline",
        "outline-2",
        "outline-offset-2",
        "theme-light:bg-neutral-100",
        "theme-light:border-neutral-400",
        "theme-light:focus:outline-black",
        "theme-dark:bg-neutral-800",
        "theme-dark:border-neutral-500",
        "theme-dark:focus:outline-white",
        props.className,
      )}
    />
  );
});
