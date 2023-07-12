import { Children, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { AdministrationBreadcrumbs } from "../../../components/administration-breadcrumbs";

export interface UserGroupsBreadcrumbsProps {
  children?: ReactNode;
}

export function UserGroupsBreadcrumbs({
  children,
}: UserGroupsBreadcrumbsProps) {
  return (
    <AdministrationBreadcrumbs>
      {children
        ? [
            <Link key="user-groups" to="/administration/user-groups">
              <FormattedMessage id="navbar.admin.user-groups" />
            </Link>,
            ...Children.toArray(children),
          ]
        : [<FormattedMessage id="navbar.admin.user-groups" />]}
    </AdministrationBreadcrumbs>
  );
}
