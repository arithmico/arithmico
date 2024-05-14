import classNames from "classnames";
import { useTranslation } from "react-i18next";
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
  subtitle?: string;
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
      {subtitle && <span className={classNames("md:pl-2")}>{subtitle}</span>}
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

export default function Navbar() {
  const [t] = useTranslation();

  return (
    <NavbarContainer>
      <NavbarTitle title="Arithmico" />
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
