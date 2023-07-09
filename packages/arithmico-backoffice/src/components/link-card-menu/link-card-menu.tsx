import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LinkCardMenuItemProps {
  to: string;
  children?: ReactNode;
}

function LinkCardMenuItem({ to, children }: LinkCardMenuItemProps) {
  return (
    <li className="grid h-20">
      <Link className="flex items-center rounded-sm bg-white p-4" to={to}>
        {children}
      </Link>
    </li>
  );
}

interface LinkCardMenuRootProps {
  children?: ReactNode;
}

function LinkCardMenuRoot({ children }: LinkCardMenuRootProps) {
  return (
    <menu className="grid max-w-5xl gap-4 lg:grid-cols-2">{children}</menu>
  );
}

export const LinkCardMenu = Object.assign(LinkCardMenuRoot, {
  Item: LinkCardMenuItem,
});
