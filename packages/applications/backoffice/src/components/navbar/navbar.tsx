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

export interface NavbarProps {
  securityAttributes: string[];
}

export function Navbar({ securityAttributes }: NavbarProps) {
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
          currentSecurityAttributes={securityAttributes}
          requiredSecurityAttributes={["disabled"]}
          accessControlMode="every"
          to="/"
          icon={<HomeIcon />}
          description={<FormattedMessage id="navbar.home" />}
        />
        <NavbarItem
          currentSecurityAttributes={securityAttributes}
          requiredSecurityAttributes={["disabled"]}
          accessControlMode="every"
          to="/mails"
          icon={<MailIcon />}
          description={<FormattedMessage id="navbar.mails" />}
        />
        <NavbarItem
          currentSecurityAttributes={securityAttributes}
          requiredSecurityAttributes={[
            "feature-flags:read",
            "configurations:read",
            "configurations:revisions:read",
            "version-tags:read",
          ]}
          accessControlMode="some"
          to="/applications"
          icon={<ManagedFolderIcon />}
          description={<FormattedMessage id="navbar.applications" />}
        />
        <NavbarItem
          currentSecurityAttributes={securityAttributes}
          requiredSecurityAttributes={[
            "users:read",
            "user-groups:read",
            "security-policies:read",
          ]}
          accessControlMode="some"
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
  currentSecurityAttributes: string[];
  requiredSecurityAttributes: string[];
  accessControlMode: "every" | "some";
}

function NavbarItem({
  icon,
  description,
  to,
  className,
  currentSecurityAttributes,
  requiredSecurityAttributes,
  accessControlMode,
}: NavbarItemProps) {
  const visible =
    accessControlMode === "every"
      ? requiredSecurityAttributes.every((securityAttribute) =>
          currentSecurityAttributes.includes(securityAttribute)
        )
      : requiredSecurityAttributes.some((securityAttribute) =>
          currentSecurityAttributes.includes(securityAttribute)
        );

  if (!visible) {
    return <></>;
  }

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
