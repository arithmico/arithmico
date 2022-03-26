import React, { useState } from 'react';
import styled from 'styled-components';
import useSessionStore from '../../stores/useSessionStore';

const TextfieldsContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 150px;
`;

const Textfield = styled.input.attrs({ type: 'text' })`
  background-color: rgba(255, 255, 255, 0.05);
  outline: none;
  border: 1px solid white;
  border-radius: 10px;
  height: 100px;
  width: 100%;
  min-width: 100px;
  font-size: 34px;
  font-weight: 300;
  color: white;
  padding: 0 20px;
`;

const LabelContainer = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;

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
  const [input, setInput] = useState('');
  const evaluate = useSessionStore((state) => state.evaluate);
  const lastOutput = useSessionStore((state) =>
    state.history.length > 0 ? state.history[state.history.length - 1].output : ''
  );

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      evaluate(input);
    }
  };

  return (
    <TextfieldsContainer>
      <LabelContainer>
        <LabelText>Input</LabelText>
        <Textfield
          placeholder="Input"
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
        />
      </LabelContainer>
      <LabelContainer>
        <LabelText>Output</LabelText>
        <Textfield placeholder="Output" readOnly value={lastOutput} />
      </LabelContainer>
    </TextfieldsContainer>
  );
}
