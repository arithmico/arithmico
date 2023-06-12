import { FormattedMessage } from "react-intl";
import { SecurityPolicyDetailsBreadcrumbs } from "../../security-policy-details/components/security-policy-details-breadcrumbs";

export interface RenameSecurityPolicyBreadcrumbsProps {
  policyName: string;
  policyId: string;
}

export function RenameSecurityPolicyBreadcrumbs({
  policyName,
  policyId,
}: RenameSecurityPolicyBreadcrumbsProps) {
  return (
    <SecurityPolicyDetailsBreadcrumbs
      policyId={policyId}
      policyName={policyName}
    >
      <FormattedMessage id="navbar.security.policies.rename" />
    </SecurityPolicyDetailsBreadcrumbs>
  );
}
