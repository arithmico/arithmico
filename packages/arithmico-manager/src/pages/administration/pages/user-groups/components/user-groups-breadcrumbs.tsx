import { Children, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { SecurityBreadcrumbs } from "../../../components/security-breadcrumbs";

export interface UserGroupsBreadcrumbsProps {
  children?: ReactNode;
}

export function UserGroupsBreadcrumbs({
  children,
}: UserGroupsBreadcrumbsProps) {
  return (
    <SecurityBreadcrumbs>
      {children
        ? [
            <Link key="user-groups" to="/administration/user-groups">
              <FormattedMessage id="navbar.security.user-groups" />
            </Link>,
            ...Children.toArray(children),
          ]
        : [<FormattedMessage id="navbar.security.user-groups" />]}
    </SecurityBreadcrumbs>
  );
}
