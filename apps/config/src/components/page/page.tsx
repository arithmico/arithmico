import React from "react";
import styled from "styled-components";
import HeaderNavBar from "@components/header-nav-bar/header-nav-bar";
import packageData from "@workspace-package.json";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

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
    <Container>
      <HeaderNavBar
        title="Arithmico"
        subTitle="Config"
        version={packageData.version}
      />
      <ScrollWrapper>
        <Content>{children}</Content>
      </ScrollWrapper>
    </Container>
  );
}
