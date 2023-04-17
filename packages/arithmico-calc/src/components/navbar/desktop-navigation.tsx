import classNames from "classnames";
import { NavigationProps } from "./types";
import { NavigationLink } from "./navigation-link";

export function DesktopNavigation({ items }: NavigationProps) {
  return (
    <nav className={classNames("ml-auto", "hidden", "h-full", "md:flex")}>
      <ul className={classNames("flex", "gap-2")}>
        {items.map(({ label, to }) => (
          <NavigationLink to={to}>{label}</NavigationLink>
        ))}
      </ul>
    </nav>
  );
}
