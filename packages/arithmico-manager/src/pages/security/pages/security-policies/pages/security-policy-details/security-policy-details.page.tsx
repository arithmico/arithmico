import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import Heading from "../../../../../../components/heading/heading";
import { LoadingPage } from "../../../../../../components/loading-page/loading-page";
import { DeleteIcon } from "../../../../../../icons/delete.icon";
import { EditIcon } from "../../../../../../icons/edit.icon";
import { useGetSecurityPolicyByIdQuery } from "../../../../../../store/api/resources/security-policies/security-policies.api";
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
      <LoadingPage isLoading={isLoading} isError={isError} />
      {isSuccess && data && (
        <>
          <SecurityPolicyDetailsBreadcrumbs policyName={data.name} />
          <div className={classNames("flex", "items-center", "my-4")}>
            <Heading level={1} className={classNames()}>
              {data.name}
            </Heading>
            {!data.readonly && (
              <menu
                className={classNames(
                  "flex",
                  "ml-auto",
                  "items-center",
                  "gap-4"
                )}
              >
                <li>
                  <span className={classNames("sr-only")}>
                    <FormattedMessage id="security-policy-details.actions.rename" />
                  </span>
                  <Link to="./rename">
                    <EditIcon className={classNames("w-6", "h-6")} />
                  </Link>
                </li>
                <li>
                  <span className={classNames("sr-only")}>
                    <FormattedMessage id="security-policy-details.actions.delete" />
                  </span>
                  <Link to="./delete">
                    <DeleteIcon className={classNames("w-6", "h-6")} />
                  </Link>
                </li>
              </menu>
            )}
          </div>
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
              <SecurityPolicyDetailsCard
                id={data.id}
                name={data.name}
                numberOfAttributes={data.attributes.length}
                readonly={data.readonly}
                totalPrincipals={data.principals.total}
                groupPrincipals={data.principals.groups}
                userPrincipals={data.principals.users}
                createdAt={new Date(data.createdAt)}
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
              <SecurityPolicyAttributeList
                readonly={data.readonly}
                attributes={data.attributes}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
