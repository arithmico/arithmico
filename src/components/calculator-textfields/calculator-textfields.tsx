import React from 'react';
import styled from 'styled-components';

const TextfieldsContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

const Textfield = styled.input.attrs({ type: 'text' })`
  background-color: rgba(255, 255, 255, 0.05);
  outline: none;
  border: 1px solid white;
  border-radius: 10px;
  height: 100px;
  width: 1000px;
  min-width: 100px;
  font-size: 34px;
  font-weight: 300;
  color: white;
  padding: 0 20px;
`;

const LabelContainer = styled.label`
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-top: 80px;
  }
`;

const LabelText = styled.span`
  margin-left: 20px;
  margin-bottom: 5px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.4);
`;

export default function CalculatorTextfields() {
  return (
    <TextfieldsContainer>
      <LabelContainer>
        <LabelText>Input</LabelText>
        <Textfield placeholder="Input" />
      </LabelContainer>
      <LabelContainer>
        <LabelText>Output</LabelText>
        <Textfield placeholder="Output" />
      </LabelContainer>
    </TextfieldsContainer>
  );
}
