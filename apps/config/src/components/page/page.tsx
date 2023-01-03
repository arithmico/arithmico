import React from "react";
import HeaderNavBar from "@components/header-nav-bar/header-nav-bar";
import classNames from "classnames";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div
      className={classNames("w-full", "h-full", "grid", "grid-rows-[auto 1fr]")}
    >
      <HeaderNavBar
        title="Arithmico"
        subTitle="Config"
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
      <div className={classNames("overflow-y-auto", "grid", "px-[15%]")}>
        <main className={classNames("mt-6")}>{children}</main>
      </div>
    </div>
  );
}
