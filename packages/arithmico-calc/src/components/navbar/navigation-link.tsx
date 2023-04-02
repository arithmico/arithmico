import classNames from "classnames";
import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
}

export function NavigationLink({ to, children }: NavigationLinkProps) {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          classNames(
            "2xl:px-12",
            "xl:px-10",
            "px-4",
            "md:px-8",
            "h-full",
            "flex",
            "items-center",
            "py-4",
            "md:py-0",
            "md:justify-center",
            "text-base",
            "md:text-xl",
            "rounded-b-md",
            "theme-light:hover:bg-neutral-300",
            "theme-light:text-neutral-700",
            "theme-dark:text-neutral-300",
            "theme-dark:hover:bg-neutral-800",
            "bold-font:font-bold",
            {
              "md:theme-light:bg-neutral-300": isActive,
              "theme-light:bg-neutral-200": isActive,
              "md:theme-dark:bg-neutral-800": isActive,
              "theme-dark:bg-neutral-700": isActive,
            }
          )
        }
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}
