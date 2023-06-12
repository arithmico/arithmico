import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { BackButtonLink } from "../../../../../../components/back-button-link/back-button-link";
import { Card } from "../../../../../../components/card/card";
import FormError from "../../../../../../components/form-error/form-error";
import FormLabel from "../../../../../../components/form-label/form-label";
import FormSubmitButton from "../../../../../../components/form-submit-button/form-submit-button";
import FormTextField from "../../../../../../components/form-text-field/form-text-field";
import Heading from "../../../../../../components/heading/heading";
import { LoadingPage } from "../../../../../../components/loading-page/loading-page";
import {
  renameSecurityPolicySchema,
  RenameSecurityPolicySchemaType,
} from "../../../../../../schemas/rename-security-policy/rename-security-policy.schema";
import {
  useGetSecurityPolicyByIdQuery,
  useRenameSecurityPolicyMutation,
} from "../../../../../../store/api/resources/security-policies/security-policies.api";
import { RenameSecurityPolicyBreadcrumbs } from "./components/rename-security-policy-breadcrumbs";

export function SecurityPolicyRenamePage() {
  const { policyId } = useParams();
  const { data, isSuccess, isLoading, isError } = useGetSecurityPolicyByIdQuery(
    {
      policyId: policyId!,
    }
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<RenameSecurityPolicySchemaType>({
    resolver: zodResolver(renameSecurityPolicySchema),
    defaultValues: {
      name: data?.name,
    },
  });
  const [rename, renameResult] = useRenameSecurityPolicyMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
    }
  }, [data, setValue]);
  useEffect(() => {
    if (renameResult.isSuccess) {
      navigate(-1);
    }
  }, [renameResult, navigate]);

  return (
    <>
      <LoadingPage isError={isError} isLoading={isLoading} />
      {isSuccess && data && (
        <>
          <RenameSecurityPolicyBreadcrumbs
            policyId={policyId!}
            policyName={data.name}
          />
          <Card className={classNames("mt-4", "max-w-5xl")}>
            <Heading level={1} className={classNames("mb-4")}>
              <FormattedMessage id="admin.security-policies.rename" />
            </Heading>
            <p className="max-w-5xl">
              <FormattedMessage id="admin.security-policies.rename.description" />
            </p>
            <form
              onSubmit={handleSubmit((values) =>
                rename({
                  policyId: policyId!,
                  name: values.name,
                })
              )}
              className={classNames("mt-4", "flex", "flex-col")}
            >
              <FormLabel>
                Name
                <FormTextField {...register("name")} />
              </FormLabel>
              <FormError error={errors.name} />
              <div className={classNames("flex", "mt-4", "items-center")}>
                <BackButtonLink
                  to={`/administration/security-policies/${data.id}`}
                />
                <FormSubmitButton
                  disabled={!dirtyFields.name || data.readonly}
                  className={classNames("ml-auto")}
                >
                  Speichern
                </FormSubmitButton>
              </div>
            </form>
          </Card>
        </>
      )}
    </>
  );
}
