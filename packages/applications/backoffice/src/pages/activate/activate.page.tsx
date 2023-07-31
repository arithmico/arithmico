import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/card/card";
import FormError from "../../components/form-error/form-error";
import FormLabel from "../../components/form-label/form-label";
import FormPasswordField from "../../components/form-password-field/form-password-field";
import FormSubmitButton from "../../components/form-submit-button/form-submit-button";
import Heading from "../../components/heading/heading";
import {
  activateUserSchema,
  ActivateUserSchemaType,
} from "../../schemas/activate-user/activate-user.schema";
import { useActivateUserMutation } from "../../store/api/resources/users/users.api";

export function ActivatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivateUserSchemaType>({
    resolver: zodResolver(activateUserSchema),
  });
  const navigate = useNavigate();
  const { activationId } = useParams();
  const [activateUser, result] = useActivateUserMutation();
  useEffect(() => {
    if (!activationId || result.isError) {
      navigate("failure");
    }
    if (result.isSuccess) {
      navigate("/login");
    }
  }, [navigate, activationId, result]);

  return (
    <Card className="w-full max-w-xs">
      <Heading level={1} className="mb-4">
        <FormattedMessage id="activate.title" />
      </Heading>
      <form
        onSubmit={handleSubmit((arg) =>
          activateUser({
            activationId: activationId!,
            password: arg.password,
          })
        )}
      >
        <FormLabel>
          <FormattedMessage id="activate.password" />
          <FormPasswordField {...register("password")} />
        </FormLabel>
        <FormError error={errors.password} />

        <FormLabel>
          <FormattedMessage id="activate.confirm-password" />
          <FormPasswordField {...register("confirmPassword")} />
        </FormLabel>
        <FormError error={errors.confirmPassword} />

        <FormSubmitButton className="mt-4 w-full">
          <FormattedMessage id="activate.submit" />
        </FormSubmitButton>
      </form>
    </Card>
  );
}
