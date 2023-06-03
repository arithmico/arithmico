import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../components/card/card";
import Heading from "../../../../../components/heading/heading";
import { SecurityPolicyAttribute } from "./security-policy-attribute";

export interface SecurityPolicyAttributeListProps {
  attributes: string[];
}

export function SecurityPolicyAttributeList({
  attributes,
}: SecurityPolicyAttributeListProps) {
  return (
    <Card>
      <Heading level={2} className={classNames("mt-0", "text-xl")}>
        <FormattedMessage id="security-policy-details.attributes.title" />
      </Heading>
      <ul className={classNames("flex", "flex-col")}>
        {attributes.map((attribute) => (
          <SecurityPolicyAttribute key={attribute} attribute={attribute} />
        ))}
      </ul>
    </Card>
  );
}
