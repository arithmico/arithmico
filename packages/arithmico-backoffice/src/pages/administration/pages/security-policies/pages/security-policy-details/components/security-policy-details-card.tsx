import classNames from "classnames";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import { DefinitionListEntry } from "../../../../../../../components/definition-list-entry/definition-list-entry";
import { DefinitionList } from "../../../../../../../components/definition-list/definition-list";
import Heading from "../../../../../../../components/heading/heading";

export interface SecurityPolicyDetailsCardProps {
  id: string;
  name: string;
  numberOfAttributes: number;
  createdAt: Date;
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
  createdAt,
}: SecurityPolicyDetailsCardProps) {
  return (
    <Card className="lg:sticky lg:top-4">
      <Heading level={2} className="mb-4">
        <FormattedMessage id="admin.security-policies.details.title" />
      </Heading>
      <DefinitionList>
        <DefinitionListEntry
          label={<FormattedMessage id="admin.security-policies.id" />}
          value={id}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.security-policies.name" />}
          value={name}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.security-policies.attributes" />}
          value={numberOfAttributes}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.security-policies.readonly" />}
          value={
            readonly ? (
              <FormattedMessage id="common.yes" />
            ) : (
              <FormattedMessage id="common.no" />
            )
          }
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.security-policies.created-at" />}
          value={
            <FormattedDate
              day="2-digit"
              month="2-digit"
              year="numeric"
              value={createdAt}
            />
          }
        />
      </DefinitionList>
      <Heading level={3} className={classNames("mt-4", "text-lg")}>
        <FormattedMessage id="admin.security-policies.principals" />
      </Heading>
      <DefinitionList>
        <DefinitionListEntry
          label={
            <FormattedMessage id="admin.security-policies.principals.users" />
          }
          value={userPrincipals}
        />
        <DefinitionListEntry
          label={
            <FormattedMessage id="admin.security-policies.principals.groups" />
          }
          value={groupPrincipals}
        />
        <DefinitionListEntry
          label={
            <FormattedMessage id="admin.security-policies.principals.total" />
          }
          value={totalPrincipals}
        />
      </DefinitionList>
    </Card>
  );
}
