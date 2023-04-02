import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { NavigationProps } from "./types";

interface NavbarContainerProps {
  children: React.ReactNode;
}

function NavbarContainer({ children }: NavbarContainerProps) {
  return (
    <header
      className={classNames(
        "flex",
        "items-center",
        "px-4",
        "lg:px-12",
        "2xl:px-[20%]",
        "theme-dark:shadow-neutral-900",
        "theme-light:shadow-white",
        "shadow-[0_0_20px]",
        "z-10",
        "max-w-full"
      )}
    >
      {children}
    </header>
  );
}

interface NavbarTitleProps {
  title: string;
  subtitle: string;
}

function NavbarTitle({ title, subtitle }: NavbarTitleProps) {
  return (
    <h1
      className={classNames(
        "text-base",
        "py-2",
        "lg:text-5xl",
        "md:text-2xl",
        "flex-row",
        "flex",
        "mr-4"
      )}
    >
      <span className={classNames("font-extralight")}>{title}</span>
      <span className={classNames("md:pl-2")}>{subtitle}</span>
    </h1>
  );
}

function NavbarNavigation({ items }: NavigationProps) {
  return (
    <>
      <DesktopNavigation items={items} />
      <MobileNavigation items={items} />
    </>
  );
}

interface NavbarNavigationItemProps {
  to: string;
  children: React.ReactNode;
}

export function NavigationLink({ to, children }: NavbarNavigationItemProps) {
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

export default function Navbar() {
  const [t] = useTranslation();

  return (
    <NavbarContainer>
      <NavbarTitle title="Arithmico" subtitle="Calc" />
      <NavbarNavigation
        items={[
          {
            label: t("nav.calculator"),
            to: "/",
          },
          {
            label: t("nav.settings"),
            to: "/settings",
          },
          {
            label: t("nav.manual"),
            to: "/manual",
          },
          {
            label: t("nav.about"),
            to: "/about",
          },
        ]}
      />
    </NavbarContainer>
  );
}
