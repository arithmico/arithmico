import { Children, ReactNode } from "react";
import { Link } from "react-router-dom";
import { SecurityPoliciesBreadcrumbs } from "../../../components/security-policies-breacrumbs";

export interface SecurityPolicyDetailsBreadcrumbsProps {
  policyName: string;
  policyId: string;
  children?: ReactNode;
}

export function SecurityPolicyDetailsBreadcrumbs({
  policyName,
  policyId,
  children,
}: SecurityPolicyDetailsBreadcrumbsProps) {
  return (
    <SecurityPoliciesBreadcrumbs>
      {children
        ? [
            <Link
              key={policyId}
              to={`/administration/security-policies/${policyId}`}
            >
              {policyName}
            </Link>,
            ...Children.toArray(children),
          ]
        : policyName}
    </SecurityPoliciesBreadcrumbs>
  );
}
