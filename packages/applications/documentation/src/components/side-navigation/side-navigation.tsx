import classNames from "classnames";
import { ReactNode } from "react";
import { ChevronRightIcon } from "../../icons/chevron-right.icon";

interface SideNavigationGroupProps {
  children?: ReactNode;
  topLevel?: boolean;
}

function SideNavigationGroup({ children, topLevel }: SideNavigationGroupProps) {
  return (
    <SideNavigationItem topLevel={topLevel}>
      <ul>{children}</ul>
    </SideNavigationItem>
  );
}

interface SideNavigationGroupTitleProps {
  children?: ReactNode;
}

function SideNavigationGroupTitle({ children }: SideNavigationGroupTitleProps) {
  return <span className="font-medium mt-2">{children}</span>;
}

interface SideNavigationItemProps {
  children?: ReactNode;
  topLevel?: boolean;
}

function SideNavigationItem({ children, topLevel }: SideNavigationItemProps) {
  return (
    <li
      className={classNames("py-1", "max-w-[200px]", {
        "grid grid-cols-[auto_1fr]": !topLevel,
        flex: topLevel,
      })}
    >
      {!topLevel && <ChevronRightIcon className="w-6 h-6 fill-black/40" />}
      {children}
    </li>
  );
}

export function SideNavigation() {
  return (
    <aside className="mr-4">
      <nav>
        <ul>
          <SideNavigationGroup topLevel>
            <SideNavigationGroupTitle>Einstieg</SideNavigationGroupTitle>
            <SideNavigationItem>Installation</SideNavigationItem>
            <SideNavigationItem>Bedienoberfläche</SideNavigationItem>
          </SideNavigationGroup>

          <SideNavigationGroup topLevel>
            <SideNavigationGroupTitle>Grundlagen</SideNavigationGroupTitle>
            <SideNavigationItem>Zahlen</SideNavigationItem>
            <SideNavigationItem>Operationen</SideNavigationItem>
            <SideNavigationItem>Konstanten</SideNavigationItem>
            <SideNavigationItem>Funktionen</SideNavigationItem>
          </SideNavigationGroup>

          <SideNavigationGroup topLevel>
            <SideNavigationGroupTitle>
              Erweiterte Konzepte
            </SideNavigationGroupTitle>
            <SideNavigationItem>
              Benutzerdefinierte Konstanten
            </SideNavigationItem>
            <SideNavigationItem>
              Benutzerdefinierte Funktionen
            </SideNavigationItem>
            <SideNavigationItem>Erweiterte Datentypen</SideNavigationItem>
          </SideNavigationGroup>

          <SideNavigationGroup topLevel>
            <SideNavigationGroupTitle>Referenz</SideNavigationGroupTitle>
            <SideNavigationGroup>
              <SideNavigationGroupTitle>Konstanten</SideNavigationGroupTitle>
              <SideNavigationItem>sin</SideNavigationItem>
              <SideNavigationItem>cos</SideNavigationItem>
              <SideNavigationItem>tan</SideNavigationItem>
            </SideNavigationGroup>
            <SideNavigationGroup>
              <SideNavigationGroupTitle>Funktionen</SideNavigationGroupTitle>
            </SideNavigationGroup>
            <SideNavigationGroup>
              <SideNavigationGroupTitle>Operationen</SideNavigationGroupTitle>
            </SideNavigationGroup>
          </SideNavigationGroup>
        </ul>
      </nav>
    </aside>
  );
}
