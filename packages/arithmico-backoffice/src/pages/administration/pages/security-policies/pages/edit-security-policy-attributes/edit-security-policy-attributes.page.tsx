import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import Heading from "../../../../../../components/heading/heading";
import { LoadingPage } from "../../../../../../components/loading-page/loading-page";
import { useGetSecurityPolicyByIdQuery } from "../../../../../../store/api/resources/security-policies/security-policies.api";
import { EditSecurityPolicyAttributesBreadcrumbs } from "./components/edit-security-policy-attributes-breadcrumbs";
import { EditSecurityPolicyAttributesCard } from "./components/edit-security-policy-attributes-card";

export function EditSecurityPolicyAttributesPage() {
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
          <EditSecurityPolicyAttributesBreadcrumbs
            policyId={data.id}
            policyName={data.name}
          />
          <Heading level={1} className={classNames("mt-4")}>
            <FormattedMessage id="administration.security-policies.edit-attributes" />
          </Heading>
          <p className={classNames("max-w-5xl", "mb-4")}>
            <FormattedMessage id="administration.security-policies.edit-attributes.description" />
          </p>
          <EditSecurityPolicyAttributesCard
            policyId={data.id}
            initialAttributes={data.attributes}
          />
        </>
      )}
    </>
  );
}
