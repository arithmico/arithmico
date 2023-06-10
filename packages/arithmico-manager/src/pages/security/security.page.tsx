import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { SecurityBreadcrumbs } from "./components/security-breadcrumbs";
import { SecurityPoliciesPage } from "./pages/security-policies/security-policies.page";
import { UserGroupsPage } from "./pages/user-groups/user-groups.page";

export default function SecurityPage() {
  return (
    <>
      <SecurityBreadcrumbs />
      <p className={classNames("my-4", "max-w-5xl")}>
        <FormattedMessage id="security.description" />
      </p>
      <SecurityPoliciesPage inline />
      <UserGroupsPage />
    </>
  );
}
