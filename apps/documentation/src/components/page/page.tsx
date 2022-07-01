import React from "react";
import styled from "styled-components";
import HeaderNavBar from "@components/header-nav-bar/header-nav-bar";
import Nav from "../nav/nav";
import chaptersDe from "../../chapters/index";

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
  grid-template-columns: 1fr 3fr 1fr;
  grid-column-gap: 1rem;
`;

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <Container>
      <HeaderNavBar title="Arithmico" subTitle="Docs" />
      <ScrollWrapper>
        <Nav chapters={chaptersDe} />
        <Content>{children}</Content>
      </ScrollWrapper>
    </Container>
  );
}
