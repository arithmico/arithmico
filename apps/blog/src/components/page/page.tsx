import React from "react";
import HeaderNavBar from "@components/header-nav-bar/header-nav-bar";
import packageData from "@workspace-package.json";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr]">
      <HeaderNavBar
        title="Arithmico"
        subTitle="Blog"
        version={packageData.version}
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
      <div className="overflow-y-auto grid p-[0.15%]">
        <main className="mt-6 px-[20%]">{children}</main>
      </div>
    </div>
  );
}
