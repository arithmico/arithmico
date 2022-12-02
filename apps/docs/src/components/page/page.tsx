import React from "react";
import HeaderNavBar from "@components/header-nav-bar/header-nav-bar";
import Nav from "../nav/nav";
import chaptersDe from "../../chapters/index";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="grid grid-rows-1">
      <HeaderNavBar
        title="Arithmico"
        subTitle="Docs"
        items={[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "Impressum",
            path: "/imprint",
          },
        ]}
      />
      <div className="overflow-y-auto grid grid-cols-3 gap-x-4">
        <Nav chapters={chaptersDe} />
        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}
