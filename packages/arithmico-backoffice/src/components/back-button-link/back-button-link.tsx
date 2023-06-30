import classNames from "classnames";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export interface BackButtonLinkProps {
  to: string | -1;
  children?: ReactNode;
  className?: string;
}

export function BackButtonLink({
  to,
  children,
  className,
}: BackButtonLinkProps) {
  return (
    <Link
      to={to as string}
      className={classNames(
        "border",
        "rounded-sm",
        "border-black/50",
        "py-2",
        "px-4",
        className
      )}
    >
      {children ? children : <FormattedMessage id="common.back" />}
    </Link>
  );
}
