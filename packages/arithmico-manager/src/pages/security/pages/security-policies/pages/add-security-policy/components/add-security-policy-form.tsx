import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { BackButtonLink } from "../../../../../../../components/back-button-link/back-button-link";
import { Card } from "../../../../../../../components/card/card";
import { Checkbox } from "../../../../../../../components/checkbox/checkbox";
import FormError from "../../../../../../../components/form-error/form-error";
import FormLabel from "../../../../../../../components/form-label/form-label";
import FormSubmitButton from "../../../../../../../components/form-submit-button/form-submit-button";
import FormTextField from "../../../../../../../components/form-text-field/form-text-field";
import {
  addSecurityPolicySchema,
  AddSecurityPolicySchemaType,
} from "../../../../../../../schemas/add-security-policy/add-security-policy.schema";
import { useCreateSecurityPolicyMutation } from "../../../../../../../store/api/slices/security/security.api";
import { SecurityAttributeVisualization } from "../../../components/security-attribute-visualization";

export interface AddSecurityPolicyFormProps {
  availableAttributes: string[];
}

export function AddSecurityPolicyForm({
  availableAttributes,
}: AddSecurityPolicyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSecurityPolicySchemaType>({
    resolver: zodResolver(addSecurityPolicySchema),
  });

  const [createPolicy, result] = useCreateSecurityPolicyMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (result.isSuccess) {
      navigate(`/security/security-policies/${result.data.id}`);
    }
  }, [result, navigate]);

  return (
    <Card className={classNames("max-w-5xl")}>
      <form onSubmit={handleSubmit((data) => createPolicy(data))}>
        <FormLabel>
          <FormattedMessage id="security.add-security-policy.form.name" />
          <FormTextField {...register("name")} />
        </FormLabel>
        <FormError error={errors.name} />
        <fieldset className={classNames("flex", "flex-col")}>
          <legend>Berechtigungen</legend>
          {availableAttributes.map((attribute) => (
            <label
              key={attribute}
              className={classNames(
                "border",
                "border-black/30",
                "my-1",
                "py-2",
                "pl-4",
                "pr-2",
                "rounded-sm",
                "flex",
                "items-center"
              )}
            >
              <span className={classNames("flex")}>
                <SecurityAttributeVisualization securityAttribute={attribute} />
              </span>
              <Checkbox value={attribute} {...register("attributes")} />
            </label>
          ))}
        </fieldset>
        <div className={classNames("flex", "mt-8")}>
          <BackButtonLink to="/security/security-policies" />
          <FormSubmitButton className={classNames("ml-auto")}>
            <FormattedMessage id="common.save" />
          </FormSubmitButton>
        </div>
      </form>
    </Card>
  );
}
