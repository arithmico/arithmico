import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { ChevronRightIcon } from "../../../../../icons/chevron-right.icon";
import { CloseIcon } from "../../../../../icons/close.icon";

export interface SecurityPolicyAttributeProps {
  attribute: string;
}

export function SecurityPolicyAttribute({
  attribute,
}: SecurityPolicyAttributeProps) {
  const segments = attribute.split(":");

  return (
    <li
      className={classNames(
        "border",
        "border-black/30",
        "my-1",
        "py-2",
        "pl-4",
        "pr-2",
        "rounded-sm",
        "flex",
        "items-center",
        "hover:bg-black/5"
      )}
    >
      {segments.map((segment, index) => (
        <span key={index} className={classNames("flex", "items-center")}>
          {index !== 0 && (
            <ChevronRightIcon
              className={classNames("w-4", "h-4", "fill-neutral-500", "mx-1")}
            />
          )}
          {segment}
        </span>
      ))}
      <button
        className={classNames(
          "ml-auto",
          "[&>svg]:fill-black/30",
          "hover:[&>svg]:fill-black"
        )}
      >
        <span className="sr-only">
          <FormattedMessage id="security-policy-details.attribute.delete" />
        </span>
        <CloseIcon className={classNames("w-6", "h-6")} />
      </button>
    </li>
  );
}
