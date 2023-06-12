import classNames from "classnames";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import { DefinitionListEntry } from "../../../../../../../components/definition-list-entry/definition-list-entry";
import { DefinitionList } from "../../../../../../../components/definition-list/definition-list";
import Heading from "../../../../../../../components/heading/heading";

interface UserGroupDetailsCardProps {
  id: string;
  name: string;
  createdAt: string;
  members: number;
  readonly: boolean;
}

export function UserGroupDetailsCard({
  id,
  name,
  createdAt,
  members,
  readonly,
}: UserGroupDetailsCardProps) {
  return (
    <Card className={classNames("max-w-5xl")}>
      <Heading level={2} className={classNames("mb-4")}>
        <FormattedMessage id="admin.user-groups.details.title" />
      </Heading>
      <DefinitionList>
        <DefinitionListEntry
          label={<FormattedMessage id="admin.user-groups.id" />}
          value={id}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.user-groups.name" />}
          value={name}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.user-groups.created-at" />}
          value={
            <FormattedDate
              day="2-digit"
              month="2-digit"
              year="numeric"
              value={createdAt}
            />
          }
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.user-groups.members" />}
          value={members}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.user-groups.readonly" />}
          value={
            readonly ? (
              <FormattedMessage id="common.yes" />
            ) : (
              <FormattedMessage id="common.no" />
            )
          }
        />
      </DefinitionList>
    </Card>
  );
}
