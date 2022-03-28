import React from 'react';
import styled from 'styled-components';
import CalculatorTextfields from '../../components/calculator-textfields/calculator-textfields';
import CalculatorToolbar from '../../components/calculator-toolbar/calculator-toolbar';
import PageContainer from '../../components/page-container/page-container';

const Container = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Calculator() {
  return (
    <Container>
      <div>
        <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--me-text-100)' }} />
        <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--me-text-200)' }} />
        <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--me-text-300)' }} />
        <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--me-text-400)' }} />
      </div>
      <CalculatorTextfields />
      <CalculatorToolbar />
    </Container>
  );
}
