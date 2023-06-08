import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "../../../../../../components/card/card";
import FormError from "../../../../../../components/form-error/form-error";
import FormLabel from "../../../../../../components/form-label/form-label";
import FormSubmitButton from "../../../../../../components/form-submit-button/form-submit-button";
import FormTextField from "../../../../../../components/form-text-field/form-text-field";
import Heading from "../../../../../../components/heading/heading";
import { LoadingPage } from "../../../../../../components/loading-page/loading-page";
import {
  securityPolicyRenameSchema,
  SecurityPolicyRenameSchemaType,
} from "../../../../../../schemas/login/security-policy-rename.schema";
import {
  useGetSecurityPolicyByIdQuery,
  useRenameSecurityPolicyMutation,
} from "../../../../../../store/api/slices/security/security.api";
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
  } = useForm<SecurityPolicyRenameSchemaType>({
    resolver: zodResolver(securityPolicyRenameSchema),
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
      navigate(`/security/security-policies/${policyId!}`);
    }
  }, [renameResult, navigate, policyId]);

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
              <FormattedMessage id="security-policy-rename.title" />
            </Heading>
            <p className="max-w-5xl">
              <FormattedMessage id="security-policy-rename.description" />
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
                <Link
                  to={`/security/security-policies/${data.id}`}
                  className={classNames(
                    "border",
                    "rounded-sm",
                    "border-black/50",
                    "py-2",
                    "px-4"
                  )}
                >
                  Zurück
                </Link>
                <FormSubmitButton
                  disabled={!dirtyFields.name}
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
