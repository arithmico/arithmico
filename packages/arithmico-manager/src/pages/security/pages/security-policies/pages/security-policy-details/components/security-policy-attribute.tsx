import classNames from "classnames";
import { ChevronRightIcon } from "../../../../../../../icons/chevron-right.icon";

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
        "items-center"
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
    </li>
  );
}
