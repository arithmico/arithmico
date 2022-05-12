import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MathItem } from '../../stores/session-store/types';
import useSessionStore from '../../stores/session-store/use-session-store';

const ToolbarContainer = styled.aside`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-flow: column;
`;

const Button = styled.button`
  background-color: var(--me-background-100);
  color: var(--me-text-400);
  border-radius: 0.25em;
  border: none;
  outline: none;
  flex: 1;
  height: 70px;
  font-size: 1.5em;
  font-weight: 300;
  text-align: left;
  padding: 0 20px;

  &:disabled {
    color: var(--me-text-200);
  }

  &:enabled:hover {
    background-color: var(--me-background-300);
  }
`;

export default function CalculatorToolbar() {
  const navigate = useNavigate();
  const outputResetted = useSessionStore((state) => state.outputResetted);
  const mathItems = useSessionStore((state) =>
    state.protocol.filter((hItem) => hItem.type === 'math')
  ) as MathItem[];
  const currentOutput =
    !outputResetted && mathItems.length > 0 ? mathItems[mathItems.length - 1].output : '';
  const currentInput = useSessionStore((state) => state.input);
  const resetDefinitions = useSessionStore((state) => state.resetDefinitions);
  const resetInput = useSessionStore((state) => state.resetInput);
  const resetOutput = useSessionStore((state) => state.resetOutput);
  const resetProtocol = useSessionStore((store) => store.resetProtocol);
  const resetAll = () => {
    resetInput();
    resetProtocol();
    resetDefinitions();
  };
  const [t] = useTranslation();

  useHotkeys(
    'ctrl + alt + m',
    () => {
      resetDefinitions();
    },
    { enableOnTags: ['INPUT'] }
  );

  useHotkeys(
    'ctrl + alt + a',
    () => {
      resetAll();
    },
    { enableOnTags: ['INPUT'] }
  );

  useHotkeys(
    'alt + p',
    () => {
      navigator.clipboard.writeText(currentInput + '\n' + currentOutput);
    },
    { enableOnTags: ['INPUT'] }
  );

  return (
    <ToolbarContainer>
      <Button onClick={resetInput}>{t('toolbar.resetInput')}</Button>
      <Button onClick={resetOutput}>{t('toolbar.resetOutput')}</Button>

      <Button onClick={() => navigate('/definitions')}>{t('toolbar.showDefinitions')}</Button>
      <Button onClick={resetDefinitions}>{t('toolbar.resetDefinitions')}</Button>

      <Button onClick={() => navigate('/protocol')}>{t('toolbar.showProtocol')}</Button>
      <Button onClick={resetProtocol}>{t('toolbar.resetProtocol')}</Button>

      <Button disabled>{t('toolbar.toggleZenMode')}</Button>
      <Button onClick={resetAll}>{t('toolbar.resetAll')}</Button>
    </ToolbarContainer>
  );
}
