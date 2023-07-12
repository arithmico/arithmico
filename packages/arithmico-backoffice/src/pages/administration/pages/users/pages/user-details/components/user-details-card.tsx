import { FormattedDate, FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import { DefinitionListEntry } from "../../../../../../../components/definition-list-entry/definition-list-entry";
import { DefinitionList } from "../../../../../../../components/definition-list/definition-list";
import Heading from "../../../../../../../components/heading/heading";
import { UserDto } from "../../../../../../../store/api/resources/users/users.types";

export interface UserDetailsCardProps {
  user: UserDto;
}

export function UserDetailsCard({ user }: UserDetailsCardProps) {
  return (
    <Card className=" w-full">
      <Heading level={2} className="mb-4">
        <FormattedMessage id="admin.users.details.title" />
      </Heading>
      <DefinitionList>
        <DefinitionListEntry
          label={<FormattedMessage id="admin.users.id" />}
          value={user.id}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.users.username" />}
          value={user.username}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.users.email" />}
          value={user.email}
        />
        <DefinitionListEntry
          label={<FormattedMessage id="admin.users.created-at" />}
          value={<FormattedDate value={user.createdAt} dateStyle={"medium"} />}
        />
      </DefinitionList>
    </Card>
  );
}
