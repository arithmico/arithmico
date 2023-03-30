import classNames from "classnames";
import { NavigationProps } from "./types";

export function DesktopNavigation({ children }: NavigationProps) {
  return (
    <nav className={classNames("ml-auto", "hidden", "h-full", "md:flex")}>
      <ul className={classNames("flex", "gap-2")}>{children}</ul>
    </nav>
  );
}
