import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSessionStore from '../../stores/session-store/use-session-store';

const ToolbarContainer = styled.aside`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-flow: column;
  margin-top: auto;
  margin-bottom: 30px;
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
  const resetDefinitions = useSessionStore((state) => state.resetDefinitions);
  const resetInput = useSessionStore((state) => state.resetInput);
  const resetOutput = useSessionStore((state) => state.resetOutput);
  const resetProtocol = useSessionStore((store) => store.resetProtocol);
  const resetAll = () => {
    resetInput();
    resetProtocol();
    resetDefinitions();
  };

  return (
    <ToolbarContainer>
      <Button onClick={resetInput}>Reset Input</Button>
      <Button onClick={resetOutput}>Reset Output</Button>

      <Button onClick={() => navigate('/definitions')}>Show Definitions</Button>
      <Button onClick={resetDefinitions}>Reset Definitions</Button>

      <Button onClick={() => navigate('/protocol')}>Show Protocol</Button>
      <Button onClick={resetProtocol}>Reset Protocol</Button>

      <Button disabled>Toggle Zen Mode</Button>
      <Button onClick={resetAll}>Reset All</Button>
    </ToolbarContainer>
  );
}
