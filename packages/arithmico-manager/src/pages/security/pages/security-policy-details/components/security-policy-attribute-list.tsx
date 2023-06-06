import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Card } from "../../../../../components/card/card";
import Heading from "../../../../../components/heading/heading";
import { EditIcon } from "../../../../../icons/edit.icon";
import { SecurityPolicyAttribute } from "./security-policy-attribute";

export interface SecurityPolicyAttributeListProps {
  attributes: string[];
}

export function SecurityPolicyAttributeList({
  attributes,
}: SecurityPolicyAttributeListProps) {
  return (
    <Card>
      <div className={classNames("flex", "items-center", "mb-4")}>
        <Heading level={2} className={classNames("mt-0", "text-xl")}>
          <FormattedMessage id="security-policy-details.attributes.title" />
        </Heading>
        <Link to="./attributes" className={classNames("ml-auto")}>
          <span className={classNames("sr-only")}>
            <FormattedMessage id="security-policy-details.actions.edit-attributes" />
          </span>
          <EditIcon className={classNames("w-6", "h-6")} />
        </Link>
      </div>
      <ul className={classNames("flex", "flex-col")}>
        {attributes.map((attribute) => (
          <SecurityPolicyAttribute key={attribute} attribute={attribute} />
        ))}
      </ul>
    </Card>
  );
}
