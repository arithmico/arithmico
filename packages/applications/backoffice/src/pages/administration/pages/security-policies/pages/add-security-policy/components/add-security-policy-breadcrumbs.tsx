import { FormattedMessage } from "react-intl";
import { SecurityPoliciesBreadcrumbs } from "../../../components/security-policies-breacrumbs";

export function AddSecurityPolicyBreadcrumbs() {
  return (
    <SecurityPoliciesBreadcrumbs>
      <FormattedMessage id="navbar.admin.security-policies.add" />
    </SecurityPoliciesBreadcrumbs>
  );
}
