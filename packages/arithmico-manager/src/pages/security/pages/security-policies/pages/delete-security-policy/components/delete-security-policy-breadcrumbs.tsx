import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../../../../../../components/breadcrumbs/breadcrumbs";
import { ShieldIcon } from "../../../../../../../icons/shield.icon";

export interface DeleteSecurityPolicyBreadcrumbsProps {
  policyId: string;
  policyName: string;
}

export function DeleteSecurityPolicyBreadcrumbs({
  policyId,
  policyName,
}: DeleteSecurityPolicyBreadcrumbsProps) {
  return (
    <Breadcrumbs
      firstIcon={<ShieldIcon className={classNames("w-6", "h-6", "pr-1")} />}
      items={[
        <Link to="/security">
          <FormattedMessage id="navbar.security" />
        </Link>,
        <Link to="/security/security-policies">
          <FormattedMessage id="navbar.security.policies" />
        </Link>,
        <Link to={`/security/security-policies/${policyId}`}>
          {policyName}
        </Link>,
        <FormattedMessage id="navbar.security.policies.delete" />,
      ]}
    />
  );
}
