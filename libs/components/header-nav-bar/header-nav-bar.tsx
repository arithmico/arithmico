import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.header`
  background-color: black;
  display: flex;
  align-items: center;

  & > h1 {
    margin: 0;
    padding: 1rem 2rem;
    font-size: 2rem;
    color: white;
    font-weight: 200;
  }

  & > h1 > span {
    font-family: Source Code Pro, Monospace, Sans;
    font-weight: 400;
  }
`;

const Version = styled.span`
  margin-left: auto;
  font-size: 1rem;
  padding: 0 1rem;
  color: white;
`;

const ImprintLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0 1rem;
`;

interface HeaderNavBarProps {
  title: string;
  subTitle: string;
  version: string;
}

export default function HeaderNavBar({
  title,
  subTitle,
  version,
}: HeaderNavBarProps) {
  return (
    <Container>
      <h1>
        {title} <span>{subTitle}</span>
      </h1>
      <Version>v{version}</Version>
      <ImprintLink to="/imprint">Impressum</ImprintLink>
    </Container>
  );
}
