import classNames from "classnames";
import { Card } from "../../components/card/card";
import FormLabel from "../../components/form-label/form-label";
import FormPasswordField from "../../components/form-password-field/form-password-field";
import FormSubmitButton from "../../components/form-submit-button/form-submit-button";
import FormTextField from "../../components/form-text-field/form-text-field";
import Heading from "../../components/heading/heading";
import { SimplePage } from "../../components/simple-page/simple-page";

export function LoginPage() {
  return (
    <SimplePage isPublic>
      <Card className={classNames("max-w-sm")}>
        <Heading level={1}>Login</Heading>
        <form>
          <FormLabel>
            Username
            <FormTextField />
          </FormLabel>

          <FormLabel>
            Password
            <FormPasswordField />
          </FormLabel>

          <FormSubmitButton className={classNames("w-full", "mt-4")}>
            Login
          </FormSubmitButton>
        </form>
      </Card>
    </SimplePage>
  );
}
