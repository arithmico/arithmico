import React from "react";
import styled from "styled-components";

const Container = styled.li<{ isError: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto 2fr;
  grid-gap: 1rem;
  padding: 20px;
  background-color: var(--me-background-100);
  border-radius: 0.25rem;
  list-style: none;
  ${({ isError }) => isError && "border: thin solid var(--me-error);"}
  color: ${({ isError }) =>
    isError ? "var(--me-error)" : "var(--me-text-400)"};

  & > span {
    font-size: 2em;
    font-family: "Source Code Pro", monospace;
  }
`;

interface ProtocolMathItemProps {
  input: string;
  output: string;
}

export default function ProtocolMathItem({
  input,
  output,
}: ProtocolMathItemProps) {
  return (
    <Container isError={false}>
      <span>{input}</span>
      <span>=</span>
      <span>{output}</span>
    </Container>
  );
}
