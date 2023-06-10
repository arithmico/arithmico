import { FormattedMessage } from "react-intl";
import { SecurityPolicyDetailsBreadcrumbs } from "../../security-policy-details/components/security-policy-details-breadcrumbs";

export interface DeleteSecurityPolicyBreadcrumbsProps {
  policyId: string;
  policyName: string;
}

export function DeleteSecurityPolicyBreadcrumbs({
  policyId,
  policyName,
}: DeleteSecurityPolicyBreadcrumbsProps) {
  return (
    <SecurityPolicyDetailsBreadcrumbs
      policyId={policyId}
      policyName={policyName}
    >
      <FormattedMessage id="navbar.security.policies.delete" />
    </SecurityPolicyDetailsBreadcrumbs>
  );
}
