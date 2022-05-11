import React, { useRef } from 'react';
import styled from 'styled-components';
import useSessionStore from '../../stores/session-store/use-session-store';
import { MathItem } from '../../stores/session-store/types';
import Textfield from '../textfield/textfield';
import { useHotkeys } from 'react-hotkeys-hook';

const TextfieldsContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 200px;
  justify-content: center;
`;

const MathTextfield = styled(Textfield)`
  font-family: 'Source Code Pro', monospace;
`;

const ErrorTextfield = styled(MathTextfield)`
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
  const goBackInHistory = useSessionStore((state) => state.goBackInInputHistory);
  const goForwardInHistory = useSessionStore((state) => state.goForwardInInputHistory);
  const mathItems = useSessionStore((state) =>
    state.protocol.filter((hItem) => hItem.type === 'math')
  ) as MathItem[];
  const lastOutput =
    !outputResetted && mathItems.length > 0 ? mathItems[mathItems.length - 1].output : '';
  const isError = mathItems.length > 0 ? mathItems[mathItems.length - 1].error : false;
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);

  useHotkeys(
    'alt + i',
    () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    { enableOnTags: ['INPUT'] }
  );

  useHotkeys(
    'alt + o',
    () => {
      if (outputRef.current) {
        outputRef.current.focus();
      }
    },
    { enableOnTags: ['INPUT'] }
  );

  const onInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.length > 0) {
      evaluate();
      if (outputRef.current) {
        outputRef.current.focus();
      }
    }
  };

  const onOutputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      goBackInHistory();
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      goForwardInHistory();
      e.preventDefault();
    }
  };

  return (
    <TextfieldsContainer>
      <LabelContainer>
        <LabelText>Input</LabelText>
        <MathTextfield
          ref={inputRef}
          placeholder="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onInputKeyPress}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </LabelContainer>
      <LabelContainer>
        <LabelText>Output</LabelText>
        {isError ? (
          <ErrorTextfield
            ref={outputRef}
            placeholder="Output"
            readOnly
            value={lastOutput}
            onKeyPress={onOutputKeyPress}
          />
        ) : (
          <MathTextfield
            ref={outputRef}
            placeholder="Output"
            readOnly
            value={lastOutput}
            onKeyPress={onOutputKeyPress}
          />
        )}
      </LabelContainer>
    </TextfieldsContainer>
  );
}
