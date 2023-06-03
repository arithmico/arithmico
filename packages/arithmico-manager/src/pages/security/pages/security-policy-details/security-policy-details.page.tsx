import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../../../components/breadcrumbs/breadcrumbs";
import { ShieldIcon } from "../../../../icons/shield.icon";
import { useGetSecurityPolicyByIdQuery } from "../../../../store/api/slices/security/security.api";

export function SecurityPolicyDetails() {
  const { policyId } = useParams();
  const { data } = useGetSecurityPolicyByIdQuery({
    policyId: policyId!,
  });

  return (
    <>
      <Breadcrumbs
        firstIcon={<ShieldIcon className={classNames("w-6", "h-6", "pr-1")} />}
        items={[
          <Link to="/security">
            <FormattedMessage id="navbar.security" />
          </Link>,
          <Link to="/security/security-policies">
            <FormattedMessage id="navbar.security.policies" />
          </Link>,
          data && data.name,
        ]}
      />
    </>
  );
}
