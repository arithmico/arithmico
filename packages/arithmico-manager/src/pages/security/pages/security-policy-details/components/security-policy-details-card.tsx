import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../components/card/card";
import Heading from "../../../../../components/heading/heading";

export interface SecurityPolicyDetailsCardProps {
  id: string;
  name: string;
  numberOfAttributes: number;
}

export function SecurityPolicyDetailsCard({
  id,
  name,
  numberOfAttributes,
}: SecurityPolicyDetailsCardProps) {
  return (
    <Card>
      <Heading level={2} className={classNames("mt-0", "text-xl")}>
        <FormattedMessage id="security-policy-details.details.title" />
      </Heading>
      <dl
        className={classNames(
          "grid",
          "grid-cols-[auto_1fr]",
          "gap-x-8",
          "gap-y-1",
          "[&>dt]:font-bold",
          "[&>dt]:text-black/40",
          "max-w-full",
          "overflow-hidden"
        )}
      >
        <dt>
          <FormattedMessage id="security-policy-details.details.id" />
        </dt>
        <dd
          className={classNames("break-words", "max-w-full", "overflow-hidden")}
        >
          {id}
        </dd>

        <dt>
          <FormattedMessage id="security-policy-details.details.name" />
        </dt>
        <dd>{name}</dd>

        <dt>
          <FormattedMessage id="security-policy-details.details.number-of-attributes" />
        </dt>
        <dd>{numberOfAttributes}</dd>
      </dl>
    </Card>
  );
}
