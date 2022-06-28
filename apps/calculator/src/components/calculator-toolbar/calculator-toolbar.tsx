import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCurrentInput from '../../hooks/use-current-input';
import useCurrentOutput from '../../hooks/use-current-output';
import useExportProtocol from '../../hooks/use-export-protocol';
import useHotkey from '../../hooks/use-hotkey';
import { useDispatch } from '../../stores/session-store/use-session-store';

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
  font-weight: var(--me-font-weight-normal);
  text-align: left;
  padding: 0 20px;

  &:disabled {
    color: var(--me-text-200);
  }

  &:enabled:hover {
    background-color: var(--me-background-300);
  }

  &:enabled:focus {
    border: 1px solid var(--me-text-400);
  }
`;

export default function CalculatorToolbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOutput = useCurrentOutput();
  const currentInput = useCurrentInput();
  const resetDefinitions = () => dispatch({ type: 'resetDefinitions' });
  const resetInput = () => dispatch({ type: 'resetInput' });
  const resetOutput = () => dispatch({ type: 'resetOutput' });
  const resetProtocol = () => dispatch({ type: 'resetProtocol' });
  const resetAll = () => {
    resetInput();
    resetProtocol();
    resetDefinitions();
  };
  const [t] = useTranslation();
  const exportProtocol = useExportProtocol();

  useHotkey('ctrl + alt + m', () => resetDefinitions());
  useHotkey('ctrl + alt + a', () => resetAll());
  useHotkey('alt + p', () => navigator.clipboard.writeText(currentInput + '\n' + currentOutput));

  return (
    <ToolbarContainer>
      <Button onClick={resetInput}>{t('toolbar.resetInput')}</Button>
      <Button onClick={resetOutput}>{t('toolbar.resetOutput')}</Button>

      <Button onClick={() => navigate('/definitions')}>{t('toolbar.showDefinitions')}</Button>
      <Button onClick={resetDefinitions}>{t('toolbar.resetDefinitions')}</Button>

      <Button onClick={() => navigate('/protocol')}>{t('toolbar.showProtocol')}</Button>
      <Button onClick={resetProtocol}>{t('toolbar.resetProtocol')}</Button>

      <Button onClick={exportProtocol}>{t('toolbar.exportProtocol')}</Button>
      <Button onClick={resetAll}>{t('toolbar.resetAll')}</Button>
    </ToolbarContainer>
  );
}
