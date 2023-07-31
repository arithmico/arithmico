import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";

export const ActionButton = forwardRef<
  HTMLButtonElement,
  HTMLProps<HTMLButtonElement>
>(({ className, children, type, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={(type ?? "button") as "button" | "submit" | "reset"}
      className={classNames(
        "inline-flex",
        "justify-center",
        "items-center",
        "rounded-sm",
        "bg-indigo-600",
        "disabled:bg-indigo-300",
        "py-2",
        "pl-2",
        "pr-4",
        "font-semibold",
        "text-white",
        "shadow-sm",
        "hover:bg-indigo-500",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-indigo-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
