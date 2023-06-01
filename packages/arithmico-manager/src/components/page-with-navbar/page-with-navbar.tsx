import classNames from "classnames";
import { Navbar } from "../navbar/navbar";

export interface PageWithNavbarProps {
  children?: React.ReactNode;
}

export function PageWithNavbar({ children }: PageWithNavbarProps) {
  return (
    <div
      className={classNames(
        "absolute",
        "inset-0",
        "bg-neutral-200",
        "grid",
        "grid-cols-[80px_auto]",
        "gap-8"
      )}
    >
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
