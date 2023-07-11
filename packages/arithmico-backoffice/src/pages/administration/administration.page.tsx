import { FormattedMessage } from "react-intl";
import { LinkCardMenu } from "../../components/link-card-menu/link-card-menu";
import { GroupIcon } from "../../icons/group.icon";
import { ShieldIcon } from "../../icons/shield.icon";
import { UserIcon } from "../../icons/user.icon";
import { AdministrationBreadcrumbs } from "./components/administration-breadcrumbs";

export default function AdministrationPage() {
  return (
    <>
      <AdministrationBreadcrumbs />
      <p className="my-4 max-w-5xl">
        <FormattedMessage id="admin.description" />
      </p>
      <LinkCardMenu>
        <LinkCardMenu.Item to="./users">
          <UserIcon className="mr-4 h-8 w-8" />
          <FormattedMessage id="admin.users" />
        </LinkCardMenu.Item>
        <LinkCardMenu.Item to="./user-groups">
          <GroupIcon className="mr-4 h-8 w-8" />
          <FormattedMessage id="admin.user-groups" />
        </LinkCardMenu.Item>
        <LinkCardMenu.Item to="./security-policies">
          <ShieldIcon className="mr-4 h-8 w-8" />
          <FormattedMessage id="admin.security-policies" />
        </LinkCardMenu.Item>
      </LinkCardMenu>
    </>
  );
}
