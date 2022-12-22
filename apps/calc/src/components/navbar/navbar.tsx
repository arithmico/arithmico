import classNames from "classnames";
import { NavLink } from "react-router-dom";

interface NavbarContainerProps {
  children: React.ReactNode;
}

function NavbarContainer({ children }: NavbarContainerProps) {
  return (
    <header
      className={classNames(
        "flex",
        "items-center",
        "px-12",
        "2xl:px-[20%]",
        "theme-dark:shadow-neutral-900",
        "shadow-[0_0_10px]",
        "z-10"
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
    <h1 className={classNames("text-5xl")}>
      <span className={classNames("font-extralight")}>{title}</span>
      <span className={classNames("pl-2")}>{subtitle}</span>
    </h1>
  );
}

interface NavbarNavigationProps {
  children: React.ReactNode;
}

function NavbarNavigation({ children }: NavbarNavigationProps) {
  return (
    <nav className={classNames("ml-auto", "flex", "h-full")}>
      <ul className={classNames("flex", "gap-2")}>{children}</ul>
    </nav>
  );
}

interface NavbarNavigationItemProps {
  to: string;
  children: React.ReactNode;
}

function NavbarNavigationItem({ to, children }: NavbarNavigationItemProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        classNames(
          "2xl:w-40",
          "xl:w-36",
          "w-32",
          "h-full",
          "flex",
          "items-center",
          "justify-center",
          "text-xl",
          "rounded-b-md",
          "theme-light:hover:bg-neutral-300",
          "theme-light:text-neutral-700",
          "theme-dark:text-neutral-300",
          "theme-dark:hover:bg-neutral-800",
          {
            "theme-light:bg-neutral-300": isActive,
            "theme-dark:bg-neutral-800": isActive,
          }
        )
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <NavbarContainer>
      <NavbarTitle title="Arithmico" subtitle="Calc" />
      <NavbarNavigation>
        <NavbarNavigationItem to="/">Calculator</NavbarNavigationItem>
        <NavbarNavigationItem to="/settings">Settings</NavbarNavigationItem>
        <NavbarNavigationItem to="/manual">Manual</NavbarNavigationItem>
        <NavbarNavigationItem to="/About">about</NavbarNavigationItem>
      </NavbarNavigation>
    </NavbarContainer>
  );
}
