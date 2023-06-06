import classNames from "classnames";
import React from "react";
import LoadingIcon from "../../icons/loading.icon";

interface FormSubmitButtonProps {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function FormSubmitButton({
  children,
  className,
  isLoading,
  disabled,
}: FormSubmitButtonProps) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={classNames(
        "inline-flex",
        "justify-center",
        "rounded-sm",
        "bg-indigo-600",
        "disabled:bg-indigo-300",
        "py-2",
        "px-4",
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
    >
      {!isLoading && children}
      {isLoading && <LoadingIcon className="h-6 w-6 animate-spin" />}
    </button>
  );
}
