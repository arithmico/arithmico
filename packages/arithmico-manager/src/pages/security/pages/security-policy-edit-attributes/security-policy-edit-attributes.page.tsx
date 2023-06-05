import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import Heading from "../../../../components/heading/heading";
import { LoadingPage } from "../../../../components/loading-page/loading-page";
import { useGetSecurityPolicyByIdQuery } from "../../../../store/api/slices/security/security.api";
import { SecurityPolicyEditAttributesBreadcrumbs } from "./components/security-policy-edit-attributes-breadcrumbs";
import { SecurityPolicyEditAttributesCard } from "./components/security-policy.edit-attributes-card";

export function SecurityPolicyEditAttributesPage() {
  const { policyId } = useParams();
  const { data, isSuccess, isLoading, isError } = useGetSecurityPolicyByIdQuery(
    {
      policyId: policyId!,
    }
  );

  return (
    <>
      <LoadingPage isLoading={isLoading} isError={isError} />
      {data && isSuccess && (
        <>
          <SecurityPolicyEditAttributesBreadcrumbs
            policyId={data.id}
            policyName={data.name}
          />
          <Heading level={1} className={classNames("mt-4")}>
            <FormattedMessage id="security-policy-details.edit-attributes.title" />
          </Heading>
          <p className={classNames("max-w-5xl", "mb-4")}>
            <FormattedMessage id="security-policy-details.edit-attributes.description" />
          </p>
          <SecurityPolicyEditAttributesCard
            initialAttributes={data.attributes}
          />
        </>
      )}
    </>
  );
}
