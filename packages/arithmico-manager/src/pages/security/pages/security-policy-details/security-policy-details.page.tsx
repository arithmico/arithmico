import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import Heading from "../../../../components/heading/heading";
import LoadingIcon from "../../../../icons/loading.icon";
import { useGetSecurityPolicyByIdQuery } from "../../../../store/api/slices/security/security.api";
import { SecurityPolicyActionsCard } from "./components/security-policy-actions-card";
import { SecurityPolicyAttributeList } from "./components/security-policy-attribute-list";
import { SecurityPolicyDetailsBreadcrumbs } from "./components/security-policy-details-breadcrumbs";
import { SecurityPolicyDetailsCard } from "./components/security-policy-details-card";

export function SecurityPolicyDetailsPage() {
  const { policyId } = useParams();
  const { data, isSuccess, isLoading, isError } = useGetSecurityPolicyByIdQuery(
    {
      policyId: policyId!,
    }
  );

  return (
    <>
      {(isLoading || isError) && (
        <div
          className={classNames(
            "w-full",
            "h-full",
            "flex",
            "justify-center",
            "items-center"
          )}
        >
          <div className={classNames("flex", "flex-col", "items-center")}>
            <LoadingIcon className={classNames("stroke-neutral-400")} />
            <p className={classNames("text-neutral-400")}>
              <FormattedMessage id="common.loading" />
            </p>
          </div>
        </div>
      )}
      {isSuccess && data && (
        <>
          <SecurityPolicyDetailsBreadcrumbs policyName={data.name} />
          <Heading level={1} className={classNames("mt-4")}>
            <FormattedMessage id="security-policy-details.title" />
          </Heading>
          <div
            className={classNames(
              "md:grid",
              "md:grid-cols-2",
              "gap-4",
              "flex",
              "flex-col"
            )}
          >
            <div
              className={classNames(
                "flex",
                "flex-col",
                "md:col-start-2",
                "md:row-start-1",
                "gap-4"
              )}
            >
              <SecurityPolicyActionsCard />
              <SecurityPolicyDetailsCard
                id={data.id}
                name={data.name}
                numberOfAttributes={data.attributes.length}
                totalPrincipals={data.principals.total}
                groupPrincipals={data.principals.groups}
                userPrincipals={data.principals.users}
              />
            </div>
            <div
              className={classNames(
                "flex",
                "flex-col",
                "md:col-start-1",
                "md:row-start-1"
              )}
            >
              <SecurityPolicyAttributeList attributes={data.attributes} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
