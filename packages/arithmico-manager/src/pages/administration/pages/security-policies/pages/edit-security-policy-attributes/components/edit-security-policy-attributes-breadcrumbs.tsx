import { FormattedMessage } from "react-intl";
import { SecurityPolicyDetailsBreadcrumbs } from "../../security-policy-details/components/security-policy-details-breadcrumbs";

export interface SecurityPolicyEditAttributesBreadcrumbsProps {
  policyName: string;
  policyId: string;
}

export function EditSecurityPolicyAttributesBreadcrumbs({
  policyId,
  policyName,
}: SecurityPolicyEditAttributesBreadcrumbsProps) {
  return (
    <SecurityPolicyDetailsBreadcrumbs
      policyId={policyId}
      policyName={policyName}
    >
      <FormattedMessage id="navbar.security.policies.attributes" />
    </SecurityPolicyDetailsBreadcrumbs>
  );
}
