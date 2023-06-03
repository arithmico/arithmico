import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import Heading from "../../../../components/heading/heading";
import { SecurityPoliciesPage } from "../security-policies/security-policies.page";

export default function SecurityPage() {
  return (
    <>
      <Heading level={1} className={classNames("mt-8")}>
        <FormattedMessage id="security.title" />
      </Heading>
      <p className={classNames("mb-4", "max-w-5xl")}>
        <FormattedMessage id="security.description" />
      </p>
      <SecurityPoliciesPage />
    </>
  );
}
