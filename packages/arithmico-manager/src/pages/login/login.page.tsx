import classNames from "classnames";
import { useForm } from "react-hook-form";
import { Card } from "../../components/card/card";
import FormLabel from "../../components/form-label/form-label";
import FormPasswordField from "../../components/form-password-field/form-password-field";
import FormSubmitButton from "../../components/form-submit-button/form-submit-button";
import FormTextField from "../../components/form-text-field/form-text-field";
import Heading from "../../components/heading/heading";
import { SimplePage } from "../../components/simple-page/simple-page";
import { loginSchema, LoginSchemaType } from "../../schemas/login/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../../components/form-error/form-error";
import { useLoginMutation } from "../../store/api/slices/auth/auth.api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [triggerLoginMutation, { isSuccess, isError, data }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        login({
          accessToken: data.accessToken,
          stayLoggedIn: true,
        })
      );
      navigate("/");
    } else if (isError) {
      navigate("./failure");
    }
  }, [isSuccess, isError, data, dispatch, navigate]);

  return (
    <SimplePage>
      <Card className={classNames("max-w-sm")}>
        <Heading level={1}>
          <FormattedMessage id="login.title" />
        </Heading>
        <form
          onSubmit={handleSubmit(({ username, password }) =>
            triggerLoginMutation({
              username,
              password,
            })
          )}
        >
          <FormLabel text={<FormattedMessage id="login.username" />}>
            <FormTextField {...register("username")} />
          </FormLabel>
          <FormError error={errors.username} />

          <FormLabel text={<FormattedMessage id="login.password" />}>
            <FormPasswordField {...register("password")} />
          </FormLabel>
          <FormError error={errors.password} />

          <FormSubmitButton className={classNames("w-full", "mt-4")}>
            <FormattedMessage id="login.login" />
          </FormSubmitButton>
        </form>
      </Card>
    </SimplePage>
  );
}
