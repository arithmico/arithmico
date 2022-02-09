import React from 'react';
import styled from 'styled-components';
import CalculatorTextfields from './calculator-textfields';
import CalculatorToolbar from './calculator-toolbar';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Calculator() {
  return (
    <Container>
      <CalculatorToolbar />
      <CalculatorTextfields />
    </Container>
  );
}
