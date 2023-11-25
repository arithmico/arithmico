import { ReactNode } from "react";
import { Header } from "../header/header";
import { SideNavigation } from "../side-navigation/side-navigation";

interface PageProps {
  children?: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div className="absolute inset-0 px-40">
      <Header />
      <div className="flex">
        <SideNavigation />
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
}
