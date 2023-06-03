import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import Heading from "../../../../components/heading/heading";
import { useGetSecurityPolicyByIdQuery } from "../../../../store/api/slices/security/security.api";
import { SecurityPolicyAttributeList } from "./components/security-policy-attribute-list";
import { SecurityPolicyDetailsBreadcrumbs } from "./components/security-policy-details-breadcrumbs";
import { SecurityPolicyDetailsCard } from "./components/security-policy-details-card";

export function SecurityPolicyDetailsPage() {
  const { policyId } = useParams();
  const { data, isSuccess } = useGetSecurityPolicyByIdQuery({
    policyId: policyId!,
  });

  return (
    <>
      {isSuccess && data && (
        <SecurityPolicyDetailsBreadcrumbs policyName={data.name} />
      )}
      <Heading level={1} className={classNames("mt-4")}>
        <FormattedMessage id="security-policy-details.title" />
      </Heading>
      <div className={classNames("grid", "grid-cols-2", "gap-4")}>
        <div>
          {isSuccess && data && (
            <SecurityPolicyAttributeList attributes={data.attributes} />
          )}
        </div>
        <div>
          {isSuccess && data && (
            <SecurityPolicyDetailsCard
              id={data.id}
              name={data.name}
              numberOfAttributes={data.attributes.length}
            />
          )}
        </div>
      </div>
    </>
  );
}
