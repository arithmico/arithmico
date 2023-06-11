import { FormattedMessage } from "react-intl";
import { UserGroupDetailsBreadcrumbs } from "../../user-group-details/components/user-group-details-breadcrumbs";

export interface DeleteUserGroupBreadcrumbsProps {
  groupId: string;
  groupName: string;
}

export function DeleteUserGroupBreadcrumbs({
  groupId,
  groupName,
}: DeleteUserGroupBreadcrumbsProps) {
  return (
    <UserGroupDetailsBreadcrumbs groupId={groupId} groupName={groupName}>
      <FormattedMessage id="navbar.security.user-groups.delete" />
    </UserGroupDetailsBreadcrumbs>
  );
}
