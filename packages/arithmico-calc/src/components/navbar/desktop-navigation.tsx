import classNames from "classnames";
import { NavigationProps } from "./types";
import { NavbarNavigationItem } from "./navbar";

export function DesktopNavigation({ items }: NavigationProps) {
  return (
    <nav className={classNames("ml-auto", "hidden", "h-full", "md:flex")}>
      <ul className={classNames("flex", "gap-2")}>
        {items.map(({ label, to }) => (
          <NavbarNavigationItem to={to}>{label}</NavbarNavigationItem>
        ))}
      </ul>
    </nav>
  );
}
