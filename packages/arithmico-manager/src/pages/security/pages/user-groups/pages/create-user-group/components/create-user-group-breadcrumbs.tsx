import { FormattedMessage } from "react-intl";
import { UserGroupsBreadcrumbs } from "../../../components/user-groups-breadcrumbs";

export function CreateUserGroupBreadcrumbs() {
  return (
    <UserGroupsBreadcrumbs>
      <FormattedMessage id="navbar.security.user-groups.new" />
    </UserGroupsBreadcrumbs>
  );
}
