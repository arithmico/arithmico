import React from 'react';
import styled from 'styled-components';
import CalculatorTextfields from '../../components/calculator-textfields/calculator-textfields';
import CalculatorToolbar from '../../components/calculator-toolbar/calculator-toolbar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 20%;
`;

export default function Calculator() {
  return (
    <Container>
      <CalculatorTextfields />
      <CalculatorToolbar />
    </Container>
  );
}
