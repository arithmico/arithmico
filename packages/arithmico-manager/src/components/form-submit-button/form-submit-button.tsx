import classNames from "classnames";
import React from "react";
import LoadingIcon from "../../icons/loading";

interface FormSubmitButtonProps {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export default function FormSubmitButton({
  children,
  className,
  isLoading,
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={classNames(
        "inline-flex",
        "justify-center",
        "rounded-md",
        "bg-indigo-600",
        "py-2",
        "px-3",
        "text-sm",
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
