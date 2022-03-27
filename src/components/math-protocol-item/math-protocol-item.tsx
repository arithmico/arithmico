import React from 'react';
import styled from 'styled-components';
import { MathItem } from '../../stores/session-store/types';

const Container = styled.li<{ isError: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 1em;
  font-size: 2em;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.25em;
  list-style: none;
  ${({ isError }) => isError && 'border: 1px solid #fd7c7c;'}
  color: ${({ isError }) => (isError ? '#fd7c7c' : 'white')};
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
