import React from 'react';
import styled from 'styled-components';
import { MathItem } from '../../stores/session-store/types';

const Container = styled.li<{ isError: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 1em;
  padding: 20px;
  background-color: var(--me-background-100);
  border-radius: 0.25em;
  list-style: none;
  ${({ isError }) => isError && 'border: thin solid var(--me-error);'}
  color: ${({ isError }) => (isError ? 'var(--me-error)' : 'var(--me-text-400)')};

  & > span {
    font-size: 2em;
  }
`;

export default function MathProtocolItem({ item }: { item: MathItem }) {
  return (
    <Container isError={item.error}>
      <span>{item.input}</span>
      <span>=</span>
      <span>{item.output}</span>
    </Container>
  );
}
