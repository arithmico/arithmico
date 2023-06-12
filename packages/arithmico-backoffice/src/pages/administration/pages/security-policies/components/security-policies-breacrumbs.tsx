import { Children, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { AdministrationBreadcrumbs } from "../../../components/administration-breadcrumbs";

export interface SecurityPoliciesBreadcrumbsProps {
  children?: ReactNode;
}

export function SecurityPoliciesBreadcrumbs({
  children,
}: SecurityPoliciesBreadcrumbsProps) {
  return (
    <AdministrationBreadcrumbs>
      {children
        ? [
            <Link
              key="security-policies"
              to="/administration/security-policies"
            >
              <FormattedMessage id="navbar.admin.security-policies" />
            </Link>,
            ...Children.toArray(children),
          ]
        : [
            <FormattedMessage
              key="security-policies"
              id="navbar.admin.security-policies"
            />,
          ]}
    </AdministrationBreadcrumbs>
  );
}
