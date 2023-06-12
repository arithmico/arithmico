import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { AdminIcon } from "../../icons/admin.icon";
import { HomeIcon } from "../../icons/home.icon";
import { LogoutIcon } from "../../icons/logout.icon";
import { MailIcon } from "../../icons/mail.icon";
import { ManagedFolderIcon } from "../../icons/managed-folder.icon";
import { logout } from "../../store/slices/auth/auth.slice";

export function Navbar() {
  return (
    <nav
      className={classNames(
        "bg-white",
        "flex",
        "flex-col",
        "max-h-full",
        "overlfow-y-hidden",
        "h-full"
      )}
    >
      <h1 className={classNames("sr-only")}>
        <FormattedMessage id="navbar.sr.title" />
      </h1>
      <ul className={classNames("flex", "flex-col", "h-full")}>
        <NavbarItem
          to="/"
          icon={<HomeIcon />}
          description={<FormattedMessage id="navbar.home" />}
        />
        <NavbarItem
          to="/mails"
          icon={<MailIcon />}
          description={<FormattedMessage id="navbar.mails" />}
        />
        <NavbarItem
          to="/versions"
          icon={<ManagedFolderIcon />}
          description={<FormattedMessage id="navbar.versions" />}
        />
        <NavbarItem
          to="/administration"
          icon={<AdminIcon />}
          description={<FormattedMessage id="navbar.admin" />}
        />

        <LogoutButton />
      </ul>
    </nav>
  );
}

interface NavbarItemProps {
  icon: React.ReactNode;
  description: React.ReactNode;
  to: string;
  className?: string;
}

function NavbarItem({ icon, description, to, className }: NavbarItemProps) {
  return (
    <li className={classNames("w-[80px]", "h-[80px]", className)}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          classNames(
            "w-full",
            "h-full",
            "flex",
            "flex-col",
            "justify-center",
            "items-center",
            "hover:bg-neutral-100",
            "[&>svg]:fill-neutral-400",
            "[&>svg]:p-1",
            "[&>svg]:hover:fill-neutral-800",
            "[&>span]:hover:text-neutral-800",
            {
              "[&>span]:text-neutral-400": !isActive,
              "[&>span]:text-neutral-800": isActive,
              "[&>svg]:fill-neutral-800": isActive,
            }
          )
        }
      >
        {icon}
        <span className={classNames("text-xs")}>{description}</span>
      </NavLink>
    </li>
  );
}

function LogoutButton() {
  const dispatch = useDispatch();

  return (
    <li className={classNames("w-[80px]", "h-[80px]", "mt-auto")}>
      <button
        onClick={() => dispatch(logout())}
        className={classNames(
          "w-full",
          "h-full",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          "hover:bg-neutral-100",
          "[&>svg]:fill-neutral-400",
          "[&>svg]:p-1",
          "[&>svg]:hover:fill-neutral-800",
          "[&>span]:text-neutral-400",
          "[&>span]:hover:text-neutral-800"
        )}
      >
        <LogoutIcon />
        <span className={classNames("text-xs")}>
          <FormattedMessage id="navbar.logout" />
        </span>
      </button>
    </li>
  );
}
