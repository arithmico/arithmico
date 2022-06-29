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

export default function Header() {
  return (
    <Container>
      <h1>
        Arithmico <span>Blog</span>
      </h1>
    </Container>
  );
}
