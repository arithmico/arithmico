import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSessionStore from '../../stores/useSessionStore';

const ToolbarContainer = styled.aside`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin-top: auto;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-radius: 10px;
  border: none;
  outline: none;
  flex: 1;
  height: 70px;
  font-size: 1.5em;
  text-align: left;
  padding: 0 20px;

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
  }

  &:enabled:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export default function CalculatorToolbar() {
  const navigate = useNavigate();
  const resetDefinitions = useSessionStore((state) => state.resetDefinitions);
  const resetInput = useSessionStore((state) => state.resetInput);
  const resetOutput = useSessionStore((state) => state.resetOutput);
  const resetProtocol = useSessionStore((store) => store.resetProtocol);

  return (
    <ToolbarContainer>
      <Button disabled>Clear All</Button>
      <Button onClick={resetInput}>Reset Input</Button>
      <Button onClick={resetOutput}>Reset Output</Button>
      <Button onClick={resetDefinitions}>Reset Definitions</Button>
      <Button onClick={() => navigate('/protocol')}>Show Protocol</Button>
      <Button onClick={resetProtocol}>Reset Protocol</Button>
      <Button disabled>Show Definitions</Button>
      <Button disabled>Toggle Zen Mode</Button>
    </ToolbarContainer>
  );
}
