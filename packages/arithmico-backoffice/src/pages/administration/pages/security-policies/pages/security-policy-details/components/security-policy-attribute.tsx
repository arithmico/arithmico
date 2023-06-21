import { SecurityAttributeVisualization } from "../../../components/security-attribute-visualization";

export interface SecurityPolicyAttributeProps {
  attribute: string;
}

export function SecurityPolicyAttribute({
  attribute,
}: SecurityPolicyAttributeProps) {
  return (
    <li className="my-1 flex items-center rounded-sm border border-black/30 py-2 pl-4 pr-2">
      <SecurityAttributeVisualization securityAttribute={attribute} />
    </li>
  );
}
