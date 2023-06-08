import classNames from "classnames";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export interface BackButtonLinkProps {
  to: string;
  children?: ReactNode;
}

export function BackButtonLink({ to, children }: BackButtonLinkProps) {
  return (
    <Link
      to={to}
      className={classNames(
        "border",
        "rounded-sm",
        "border-black/50",
        "py-2",
        "px-4"
      )}
    >
      {children ? children : <FormattedMessage id="common.back" />}
    </Link>
  );
}
