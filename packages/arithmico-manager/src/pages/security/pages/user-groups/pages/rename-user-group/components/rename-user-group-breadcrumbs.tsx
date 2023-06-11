import { FormattedMessage } from "react-intl";
import { UserGroupDetailsBreadcrumbs } from "../../user-group-details/components/user-group-details-breadcrumbs";

interface RenameUserGroupBreacrumbsProps {
  groupName: string;
  groupId: string;
}

export function RenameUserGroupBreacrumbs({
  groupId,
  groupName,
}: RenameUserGroupBreacrumbsProps) {
  return (
    <UserGroupDetailsBreadcrumbs groupName={groupName} groupId={groupId}>
      <FormattedMessage id="navbar.security.user-groups.rename" />
    </UserGroupDetailsBreadcrumbs>
  );
}
