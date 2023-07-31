import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { SecurityAttributeVisualization } from "../../../components/security-attribute-visualization";

export interface SecurityPolicyAttributeProps {
  attribute: string;
}

export function SecurityPolicyAttribute({
  attribute,
}: SecurityPolicyAttributeProps) {
  return (
    <BoxedList.Item className="py-2 pl-4 pr-2">
      <SecurityAttributeVisualization securityAttribute={attribute} />
    </BoxedList.Item>
  );
}
