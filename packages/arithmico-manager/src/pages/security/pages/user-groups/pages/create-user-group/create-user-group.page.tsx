import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import Heading from "../../../../../../components/heading/heading";
import { CreateUserGroupBreadcrumbs } from "./components/create-user-group-breadcrumbs";
import { CreateUserGroupForm } from "./components/create-user-group-form";

export function CreateUserGroupPage() {
  return (
    <>
      <CreateUserGroupBreadcrumbs />
      <Heading level={1} className={classNames("my-4")}>
        <FormattedMessage id="security.user-groups.new.title" />
      </Heading>
      <p className={classNames("max-w-5xl")}>
        <FormattedMessage id="security.user-groups.new.description" />
      </p>
      <CreateUserGroupForm />
    </>
  );
}
