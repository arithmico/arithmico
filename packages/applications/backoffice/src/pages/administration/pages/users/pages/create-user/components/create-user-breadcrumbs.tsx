import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { UsersBreadcrumbs } from "../../../components/users-breadcrumbs";

export interface CreateUsersBreadcrumbsProps {
  children?: ReactNode;
}

export function CreateUserBreadcrumbs({
  children,
}: CreateUsersBreadcrumbsProps) {
  return (
    <UsersBreadcrumbs>
      {children ? (
        [
          <Link key="create-user" to="/administration/users/new">
            <FormattedMessage id="navbar.admin.users.new" />
          </Link>,
        ]
      ) : (
        <FormattedMessage id="navbar.admin.users.new" />
      )}
    </UsersBreadcrumbs>
  );
}
