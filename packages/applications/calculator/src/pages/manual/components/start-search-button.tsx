import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";
import { MagnifierIcon } from "ui-components";

export const StartSearchButton = forwardRef<
  HTMLButtonElement,
  HTMLProps<HTMLButtonElement> & { text: string }
>(({ text, ...props }, ref) => {
  return (
    <button
      {...props}
      type="button"
      className={classNames(
        "w-14",
        "rounded-r-md",
        "flex",
        "items-center",
        "justify-center",
        "hover:opacity-100",
        "focus:opacity-100",
        "border-y",
        "border-r",
        "rounded-r-sm",
        "theme-light:bg-neutral-100",
        "theme-light:border-neutral-400",
        "theme-dark:bg-neutral-800",
        "theme-dark:border-neutral-500",
        "peer-focus-visible:outline-none",
        "ui-focus-visible:outline",
        "outline-2",
        "outline-offset-2",
        "theme-light:outline-black",
        "theme-dark:outline-white",
        "[&:focus>*]:opacity-100",
        "[&>*]:opacity-50",
      )}
    >
      <MagnifierIcon
        className={classNames(
          "theme-light:fill-black",
          "theme-dark:fill-white",
          "w-12",
          "h-12",
        )}
      />
      <span className="sr-only">{text}</span>
    </button>
  );
});
