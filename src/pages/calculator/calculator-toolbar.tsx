import React from 'react';
import styled from 'styled-components';

const ToolbarContainer = styled.aside`
  padding: 30px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  margin-right: 100px;
`;

const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-radius: 10px;
  border: none;
  outline: none;
  width: 235px;
  height: 70px;
  margin: 10px;
  font-size: 24px;
  text-align: left;
  padding: 0 20px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export default function CalculatorToolbar() {
  return (
    <ToolbarContainer>
      <Button>Clear All</Button>
      <Button>Clear Input</Button>
      <Button>Clear Output</Button>
      <Button>Clear Definitions</Button>
    </ToolbarContainer>
  );
}
