import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Breadcrumbs } from "../../../../components/breadcrumbs/breadcrumbs";
import Heading from "../../../../components/heading/heading";
import { ShieldIcon } from "../../../../icons/shield.icon";
import { SecurityPoliciesPage } from "../security-policies/security-policies.page";

export default function SecurityPage() {
  return (
    <>
      <Breadcrumbs
        firstIcon={<ShieldIcon className={classNames("w-6", "h-6", "pr-1")} />}
        items={[
          <Heading
            level={1}
            className={classNames("text-base", "mt-0", "mb-0")}
          >
            <FormattedMessage id="security.title" />
          </Heading>,
        ]}
      />
      <p className={classNames("my-4", "max-w-5xl")}>
        <FormattedMessage id="security.description" />
      </p>
      <SecurityPoliciesPage inline />
    </>
  );
}
