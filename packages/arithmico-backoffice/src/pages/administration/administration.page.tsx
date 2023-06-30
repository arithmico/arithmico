import classNames from "classnames";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { GroupIcon } from "../../icons/group.icon";
import { ShieldIcon } from "../../icons/shield.icon";
import { UserIcon } from "../../icons/user.icon";
import { AdministrationBreadcrumbs } from "./components/administration-breadcrumbs";

export default function AdministrationPage() {
  return (
    <>
      <AdministrationBreadcrumbs />
      <p className={classNames("my-4", "max-w-5xl")}>
        <FormattedMessage id="admin.description" />
      </p>
      <menu
        className={classNames("grid", "lg:grid-cols-2", "gap-4", "max-w-5xl")}
      >
        <MenuItem to="./users">
          <UserIcon className={classNames("w-8", "h-8", "mr-4")} />
          Benutzer
        </MenuItem>
        <MenuItem to="./user-groups">
          <GroupIcon className={classNames("w-8", "h-8", "mr-4")} />
          Benutzergruppen
        </MenuItem>
        <MenuItem to="./security-policies">
          <ShieldIcon className={classNames("w-8", "h-8", "mr-4")} />
          Sicherheitsrichtlinien
        </MenuItem>
      </menu>
    </>
  );
}

interface MenuItemProps {
  to: string;
  children?: ReactNode;
}

function MenuItem({ to, children }: MenuItemProps) {
  return (
    <li className={classNames("grid", "h-20")}>
      <Link
        className={classNames(
          "bg-white",
          "p-4",
          "rounded-sm",
          "flex",
          "items-center"
        )}
        to={to}
      >
        {children}
      </Link>
    </li>
  );
}
