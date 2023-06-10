import { Children, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { SecurityBreadcrumbs } from "../../../components/security-breadcrumbs";

export interface SecurityPoliciesBreadcrumbsProps {
  children?: ReactNode;
}

export function SecurityPoliciesBreadcrumbs({
  children,
}: SecurityPoliciesBreadcrumbsProps) {
  return (
    <SecurityBreadcrumbs>
      {children
        ? [
            <Link key="security-policies" to="/security/security-policies">
              <FormattedMessage id="navbar.security.policies" />
            </Link>,
            ...Children.toArray(children),
          ]
        : [
            <FormattedMessage
              key="security-policies"
              id="navbar.security.policies"
            />,
          ]}
    </SecurityBreadcrumbs>
  );
}
