import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useSessionStore from '../../stores/session-store/use-session-store';
import { MathItem } from '../../stores/session-store/types';
import Textfield from '../textfield/textfield';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';

const TextfieldsContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const MathTextfield = styled(Textfield)`
  width: 100%;
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
  font-weight: var(--me-font-weight-normal);
`;

export default function CalculatorTextfields() {
  const input = useSessionStore((state) => state.input);
  const setInput = useSessionStore((state) => state.setInput);
  const outputResetted = useSessionStore((state) => state.outputResetted);
  const evaluate = useSessionStore((state) => state.evaluate);
  const resetInput = useSessionStore((state) => state.resetInput);
  const resetOutput = useSessionStore((state) => state.resetOutput);
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
  const [t] = useTranslation();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

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

  useHotkeys(
    'ctrl + alt + i',
    () => {
      resetInput();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    { enableOnTags: ['INPUT'] }
  );

  useHotkeys(
    'ctrl + alt + o',
    () => {
      resetOutput();
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
        <LabelText>{t('common.input')}</LabelText>
        <MathTextfield
          ref={inputRef}
          placeholder={t('common.input')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onInputKeyPress}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </LabelContainer>
      <LabelContainer>
        <LabelText>{t('common.output')}</LabelText>
        {isError ? (
          <ErrorTextfield
            ref={outputRef}
            placeholder={t('common.output')}
            readOnly
            value={lastOutput}
            onKeyPress={onOutputKeyPress}
          />
        ) : (
          <MathTextfield
            ref={outputRef}
            placeholder={t('common.output')}
            readOnly
            value={lastOutput}
            onKeyPress={onOutputKeyPress}
          />
        )}
      </LabelContainer>
    </TextfieldsContainer>
  );
}
