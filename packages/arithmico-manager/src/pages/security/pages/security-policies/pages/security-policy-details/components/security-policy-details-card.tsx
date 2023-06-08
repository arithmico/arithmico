import classNames from "classnames";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";

export interface SecurityPolicyDetailsCardProps {
  id: string;
  name: string;
  numberOfAttributes: number;
  readonly: boolean;
  totalPrincipals: number;
  userPrincipals: number;
  groupPrincipals: number;
}

export function SecurityPolicyDetailsCard({
  id,
  name,
  numberOfAttributes,
  readonly,
  groupPrincipals,
  totalPrincipals,
  userPrincipals,
}: SecurityPolicyDetailsCardProps) {
  return (
    <Card>
      <Heading level={2} className={classNames("mt-0", "text-xl")}>
        <FormattedMessage id="security-policy-details.details.title" />
      </Heading>
      <DefinitionList>
        <LabelValuePair
          label={<FormattedMessage id="security-policy-details.details.id" />}
          value={id}
        />
        <LabelValuePair
          label={<FormattedMessage id="security-policy-details.details.name" />}
          value={name}
        />
        <LabelValuePair
          label={
            <FormattedMessage id="security-policy-details.details.number-of-attributes" />
          }
          value={numberOfAttributes}
        />
        <LabelValuePair
          label={
            <FormattedMessage id="security-policy-details.details.readonly" />
          }
          value={
            readonly ? (
              <FormattedMessage id="common.yes" />
            ) : (
              <FormattedMessage id="common.no" />
            )
          }
        />
      </DefinitionList>
      <Heading level={3} className={classNames("mt-4", "text-lg")}>
        <FormattedMessage id="security-policy-details.details.principals" />
      </Heading>
      <DefinitionList>
        <LabelValuePair
          label={
            <FormattedMessage id="security-policy-details.details.principals.users" />
          }
          value={userPrincipals}
        />
        <LabelValuePair
          label={
            <FormattedMessage id="security-policy-details.details.principals.groups" />
          }
          value={groupPrincipals}
        />
        <LabelValuePair
          label={
            <FormattedMessage id="security-policy-details.details.principals.total" />
          }
          value={totalPrincipals}
        />
      </DefinitionList>
    </Card>
  );
}

interface DefinitionListProps {
  children: ReactNode;
}

function DefinitionList({ children }: DefinitionListProps) {
  return (
    <dl
      className={classNames(
        "grid",
        "grid-cols-[1fr_2fr]",
        "gap-x-8",
        "gap-y-1",
        "[&>dt]:font-bold",
        "[&>dt]:text-black/40",
        "max-w-full",
        "overflow-hidden"
      )}
    >
      {children}
    </dl>
  );
}

interface LabelValuePairProps {
  label: ReactNode;
  value: ReactNode;
}

function LabelValuePair({ label, value }: LabelValuePairProps) {
  return (
    <>
      <dt
        className={classNames("break-words", "max-w-full", "overflow-hidden")}
      >
        {label}
      </dt>
      <dd
        className={classNames("break-words", "max-w-full", "overflow-hidden")}
      >
        {value}
      </dd>
    </>
  );
}
