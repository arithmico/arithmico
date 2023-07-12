import classNames from "classnames";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface ButtonLinkProps {
  children?: ReactNode;
  className?: string;
  to: string;
}

export function ButtonLink({ children, className, to }: ButtonLinkProps) {
  return (
    <Link
      to={to}
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
    >
      {children}
    </Link>
  );
}
