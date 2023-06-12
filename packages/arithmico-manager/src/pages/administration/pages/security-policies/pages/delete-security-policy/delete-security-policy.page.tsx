import classNames from "classnames";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { BackButtonLink } from "../../../../../../components/back-button-link/back-button-link";
import Heading from "../../../../../../components/heading/heading";
import { LoadingPage } from "../../../../../../components/loading-page/loading-page";
import {
  useDeleteSecurityPolicyMutation,
  useGetSecurityPolicyByIdQuery,
} from "../../../../../../store/api/resources/security-policies/security-policies.api";
import { DeleteSecurityPolicyBreadcrumbs } from "./components/delete-security-policy-breadcrumbs";

export function DeleteSecurityPolicyPage() {
  const { policyId } = useParams();
  const { isError, isSuccess, isLoading, data } = useGetSecurityPolicyByIdQuery(
    { policyId: policyId! }
  );
  const [deleteSecurityPolicy, result] = useDeleteSecurityPolicyMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/security/security-policies");
    }
  }, [result, navigate]);

  return (
    <>
      <LoadingPage isLoading={isLoading} isError={isError} />
      {isSuccess && data && (
        <>
          <DeleteSecurityPolicyBreadcrumbs
            policyId={policyId!}
            policyName={data.name}
          />
          <Heading level={1} className={classNames("my-4")}>
            <FormattedMessage id="security.delete-security-policies.title" />
          </Heading>
          <p className={classNames("max-w-5xl")}>
            <FormattedMessage id="security.delete-security-policies.description" />
          </p>
          <div className={classNames("flex", "mt-4", "max-w-5xl")}>
            <BackButtonLink to={`/security/security-policies/${data.id}`} />
            <button
              disabled={data.principals.total > 0 || data.readonly}
              onClick={() => deleteSecurityPolicy({ policyId: policyId! })}
              type="button"
              className={classNames(
                "ml-auto",
                "inline-flex",
                "justify-center",
                "rounded-sm",
                "bg-red-600",
                "disabled:bg-red-300",
                "py-2",
                "px-4",
                "font-semibold",
                "text-white",
                "shadow-sm",
                "hover:bg-red-500",
                "focus-visible:outline",
                "focus-visible:outline-2",
                "focus-visible:outline-offset-2",
                "focus-visible:outline-red-600"
              )}
            >
              <span aria-hidden>
                <FormattedMessage id="security.delete-security-policies.delete" />
              </span>
              <span className="sr-only">
                <FormattedMessage id="security.delete-security-policies.sr.delete" />
              </span>
            </button>
          </div>
        </>
      )}
    </>
  );
}
