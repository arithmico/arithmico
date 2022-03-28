import React from 'react';
import styled from 'styled-components';
import useSessionStore from '../../stores/session-store/use-session-store';
import { MathItem } from '../../stores/session-store/types';

const TextfieldsContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 150px;
`;

const Textfield = styled.input.attrs({ type: 'text' })`
  background-color: var(--me-background-100);
  outline: none;
  border: 1px solid var(--me-text-400);
  border-radius: 10px;
  height: 100px;
  width: 100%;
  min-width: 100px;
  font-size: 2.5em;
  font-weight: 300;
  color: var(--me-text-400);
  padding: 0 20px;
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
