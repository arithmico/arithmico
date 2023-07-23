import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { BackButtonLink } from "../../../../../../../components/back-button-link/back-button-link";
import { Card } from "../../../../../../../components/card/card";
import FormError from "../../../../../../../components/form-error/form-error";
import FormLabel from "../../../../../../../components/form-label/form-label";
import FormSubmitButton from "../../../../../../../components/form-submit-button/form-submit-button";
import FormTextField from "../../../../../../../components/form-text-field/form-text-field";
import {
  addUserGroupSchema,
  AddUserGroupSchemaType,
} from "../../../../../../../schemas/add-user-group/add-user-group.schema";
import { useCreateUserGroupMutation } from "../../../../../../../store/api/resources/user-groups/user-groups.api";

export function CreateUserGroupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserGroupSchemaType>({
    resolver: zodResolver(addUserGroupSchema),
  });
  const [createUserGroup, result] = useCreateUserGroupMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (result.isSuccess) {
      navigate(-1);
    } else if (result.isError) {
      navigate("failure");
    }
  }, [result, navigate]);

  return (
    <Card className={classNames("max-w-5xl", "mt-4")}>
      <form
        onSubmit={handleSubmit((data) => createUserGroup({ name: data.name }))}
      >
        <FormLabel>
          <FormattedMessage id="administration.user-groups.name" />
          <FormTextField {...register("name")} />
        </FormLabel>
        <FormError error={errors.name} />
        <div className={classNames("flex", "mt-8")}>
          <BackButtonLink to="/administration/user-groups" />
          <FormSubmitButton
            isLoading={result.isLoading}
            className={classNames("ml-auto")}
          >
            <FormattedMessage id="common.save" />
          </FormSubmitButton>
        </div>
      </form>
    </Card>
  );
}
