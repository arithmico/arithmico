import { Children, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { AdministrationBreadcrumbs } from "../../../components/administration-breadcrumbs";

export interface UsersBreadcrumbsProps {
  children?: ReactNode;
}

export function UsersBreadcrumbs({ children }: UsersBreadcrumbsProps) {
  return (
    <AdministrationBreadcrumbs>
      {children
        ? [
            <Link key="users" to="/administration/users">
              <FormattedMessage id="navbar.admin.users" />
            </Link>,
            ...Children.toArray(children),
          ]
        : [<FormattedMessage key="users" id="navbar.admin.users" />]}
    </AdministrationBreadcrumbs>
  );
}
