import { CloseIcon } from "@arithmico/frontend-components";
import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";

export const ResetTextFieldButton = forwardRef<
  HTMLButtonElement,
  HTMLProps<HTMLButtonElement> & { text: string }
>(({ text, ...props }, ref) => {
  return (
    <button
      {...props}
      type="button"
      className={classNames(
        "h-full",
        "w-10",
        "-ml-10",
        "rounded-r-md",
        "flex",
        "items-center",
        "justify-center",
        "hover:opacity-100",
        "focus:opacity-100",
        "outline-none",
        "border",
        "rounded-r-sm",
        "theme-light:border-neutral-400",
        "theme-light:peer-focus:border-neutral-600",
        "theme-light:focus:border-neutral-600",
        "theme-dark:border-neutral-500",
        "theme-dark:peer-focus:border-neutral-100",
        "theme-dark:focus:border-neutral-100",
        "[&:focus>*]:opacity-100",
        "peer-focus:[&>*]:opacity-100",
        "[&>*]:opacity-50"
      )}
    >
      <CloseIcon
        className={classNames(
          "theme-light:fill-black",
          "theme-dark:fill-white",
          "w-8",
          "h-8"
        )}
      />
      <span className="sr-only">{text}</span>
    </button>
  );
});
