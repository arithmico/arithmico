import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import HomeIcon from "../../icons/home.icon";

export function Navbar() {
  return (
    <nav className={classNames("bg-white")}>
      <h1 className={classNames("sr-only")}>
        <FormattedMessage id="navbar.sr.title" />
      </h1>
      <ul>
        <NavbarItem
          to="/"
          icon={<HomeIcon />}
          description={<FormattedMessage id="navbar.home" />}
        />
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
      <Link
        to={to}
        className={classNames(
          "w-full",
          "h-full",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          "[&>svg]:fill-neutral-500",
          "[&>svg]:hover:fill-neutral-800",
          "[&>span]:text-neutral-500",
          "[&>span]:hover:text-neutral-800"
        )}
      >
        {icon}
        <span className={classNames("text-xs")}>{description}</span>
      </Link>
    </li>
  );
}
