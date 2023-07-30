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
import { SecurityPolicyUserGroupList } from "./components/security-policy-user-group-list";
import { SecurityPolicyUserList } from "./components/security-policy-user-list";

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
          <SecurityPolicyDetailsBreadcrumbs
            policyId={data.id}
            policyName={data.name}
          />
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
                    <FormattedMessage id="administration.security-policies.rename" />
                  </span>
                  <Link to="./rename">
                    <EditIcon className={classNames("w-6", "h-6")} />
                  </Link>
                </li>
                <li>
                  <span className={classNames("sr-only")}>
                    <FormattedMessage id="administration.security-policies.delete" />
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
              "lg:grid",
              "lg:grid-cols-2",
              "gap-4",
              "flex",
              "flex-col"
            )}
          >
            <div
              className={classNames(
                "flex",
                "flex-col",
                "lg:col-start-2",
                "lg:row-start-1",
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
                "lg:col-start-1",
                "lg:row-start-1",
                "gap-4"
              )}
            >
              <SecurityPolicyAttributeList
                readonly={data.readonly}
                attributes={[...data.attributes].sort()}
              />
              <SecurityPolicyUserList policyId={policyId!} />
              <SecurityPolicyUserGroupList policyId={policyId!} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
