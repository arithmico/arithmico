import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { BackButtonLink } from "../../../../../../components/back-button-link/back-button-link";
import { Card } from "../../../../../../components/card/card";
import FormError from "../../../../../../components/form-error/form-error";
import FormLabel from "../../../../../../components/form-label/form-label";
import FormSubmitButton from "../../../../../../components/form-submit-button/form-submit-button";
import FormTextField from "../../../../../../components/form-text-field/form-text-field";
import Heading from "../../../../../../components/heading/heading";
import {
  createUserSchema,
  CreateUserSchemaType,
} from "../../../../../../schemas/create-user/create-user.schema";
import { useCreateUserMutation } from "../../../../../../store/api/resources/users/users.api";
import { CreateUserBreadcrumbs } from "./components/create-user-breadcrumbs";

export function CreateUserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(createUserSchema),
  });
  const [createUser, result] = useCreateUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (result.isSuccess) {
      navigate(-1);
    } else if (result.isError) {
      navigate("failure");
    }
  }, [navigate, result]);

  return (
    <>
      <CreateUserBreadcrumbs />
      <Heading level={1} className="my-4">
        <FormattedMessage id="admin.users.new.title" />
      </Heading>
      <p className="mb-4 max-w-5xl">
        <FormattedMessage id="admin.users.new.description" />
      </p>
      <Card className="max-w-5xl">
        <form
          onSubmit={handleSubmit((arg) =>
            createUser({
              username: arg.username,
              email: arg.email,
            })
          )}
        >
          <FormLabel>
            <FormattedMessage id="admin.users.username" />
            <FormTextField {...register("username")} />
          </FormLabel>
          <FormError error={errors.username} />

          <FormLabel>
            <FormattedMessage id="admin.users.email" />
            <FormTextField {...register("email")} />
          </FormLabel>
          <FormError error={errors.email} />

          <div className="mt-8 flex">
            <BackButtonLink to={-1} />
            <FormSubmitButton className="ml-auto">
              <FormattedMessage id="admin.users.new.submit" />
            </FormSubmitButton>
          </div>
        </form>
      </Card>
    </>
  );
}
