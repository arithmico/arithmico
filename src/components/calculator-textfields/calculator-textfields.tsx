import React from 'react';
import styled from 'styled-components';
import useSessionStore from '../../stores/session-store/use-session-store';
import { MathItem } from '../../stores/session-store/types';
import Textfield from '../textfield/textfield';

const TextfieldsContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 200px;
  justify-content: center;
`;

const ErrorTextfield = styled(Textfield)`
  color: var(--me-error);
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
  color: var(--me-text-100);
`;

export default function CalculatorTextfields() {
  const input = useSessionStore((state) => state.input);
  const setInput = useSessionStore((state) => state.setInput);
  const outputResetted = useSessionStore((state) => state.outputResetted);
  const evaluate = useSessionStore((state) => state.evaluate);
  const mathItems = useSessionStore((state) =>
    state.protocol.filter((hItem) => hItem.type === 'math')
  ) as MathItem[];
  const lastOutput =
    !outputResetted && mathItems.length > 0 ? mathItems[mathItems.length - 1].output : '';
  const isError = mathItems.length > 0 ? mathItems[mathItems.length - 1].error : false;

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      evaluate();
    }
  };

  return (
    <TextfieldsContainer>
      <LabelContainer>
        <LabelText>Input</LabelText>
        <Textfield
          placeholder="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
        />
      </LabelContainer>
      <LabelContainer>
        <LabelText>Output</LabelText>
        {isError ? (
          <ErrorTextfield placeholder="Output" readOnly value={lastOutput} />
        ) : (
          <Textfield placeholder="Output" readOnly value={lastOutput} />
        )}
      </LabelContainer>
    </TextfieldsContainer>
  );
}
