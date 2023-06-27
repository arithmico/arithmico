import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { BoxedList } from "../../../../../../../components/boxed-list/boxed-list";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { EditIcon } from "../../../../../../../icons/edit.icon";
import { SecurityPolicyAttribute } from "./security-policy-attribute";

export interface SecurityPolicyAttributeListProps {
  attributes: string[];
  readonly: boolean;
}

export function SecurityPolicyAttributeList({
  attributes,
  readonly,
}: SecurityPolicyAttributeListProps) {
  return (
    <Card>
      <div className={classNames("flex", "items-center", "mb-4")}>
        <Heading level={2} className={classNames("mt-0", "text-xl")}>
          <FormattedMessage id="admin.security-policies.attributes" />
        </Heading>
        {!readonly && (
          <Link to="./attributes" className={classNames("ml-auto")}>
            <span className={classNames("sr-only")}>
              <FormattedMessage id="admin.security-policies.edit-attributes" />
            </span>
            <EditIcon className={classNames("w-6", "h-6")} />
          </Link>
        )}
      </div>
      <BoxedList>
        {attributes.map((attribute) => (
          <SecurityPolicyAttribute key={attribute} attribute={attribute} />
        ))}
      </BoxedList>
    </Card>
  );
}
