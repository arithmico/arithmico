import classNames from "classnames";
import { SecurityAttributeVisualization } from "../../../components/security-attribute-visualization";

export interface SecurityPolicyAttributeProps {
  attribute: string;
}

export function SecurityPolicyAttribute({
  attribute,
}: SecurityPolicyAttributeProps) {
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
      <SecurityAttributeVisualization securityAttribute={attribute} />
    </li>
  );
}
