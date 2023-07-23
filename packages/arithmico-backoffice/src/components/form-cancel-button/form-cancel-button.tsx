import classNames from "classnames";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

export interface FormCancelButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function FormCancelButton({
  children,
  className,
  onClick,
}: FormCancelButtonProps) {
  return (
    <button
      className={classNames(
        "border",
        "rounded-sm",
        "border-black/50",
        "py-2",
        "px-4",
        className
      )}
      onClick={() => onClick?.()}
    >
      {children ? children : <FormattedMessage id="common.cancel" />}
    </button>
  );
}
