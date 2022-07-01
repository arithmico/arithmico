import React from "react";
import styled from "styled-components";

const Container = styled.header`
  background-color: black;

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

interface HeaderNavBarProps {
  title: string;
  subTitle: string;
}

export default function HeaderNavBar({ title, subTitle }: HeaderNavBarProps) {
  return (
    <Container>
      <h1>
        {title} <span>{subTitle}</span>
      </h1>
    </Container>
  );
}
