import React from "react";
import styled from "styled-components";
import HeaderNavBar from "@components/header-nav-bar/header-nav-bar";
import packageData from "@workspace-package.json";

const Content = styled.main`
  margin-top: 1.5rem;
`;

const ScrollWrapper = styled.div`
  overflow-y: auto;
  display: grid;
  padding: 0 15%;
`;

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
      <ScrollWrapper>
        <Content>{children}</Content>
      </ScrollWrapper>
    </div>
  );
}
