import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";

export const Checkbox = forwardRef<
  HTMLInputElement,
  HTMLProps<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      type="checkbox"
      className={classNames(
        "w-4",
        "h-4",
        "text-blue-600",
        "bg-gray-100",
        "border-gray-300",
        "rounded",
        "focus:ring-blue-500",
        "focus:ring-2",
        "ml-auto",
        className
      )}
    />
  );
});
