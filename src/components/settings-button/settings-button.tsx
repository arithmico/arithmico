import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  height: 3rem;
  margin: 1rem 0;
`;

const Label = styled.label`
  height: 3rem;
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: var(--me-font-weight-normal);
`;

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--me-background-300);
  outline: none;
  border: none;
  border-radius: 0.25rem;
  height: 100%;
  width: 200px;
  font-size: 2rem;
  color: var(--me-text-400);
  justify-content: center;
  padding: 0.25rem 1rem;
  font-weight: var(--me-font-weight-normal);
  margin-left: auto;

  &:hover {
    background-color: var(--me-background-400);
  }
`;

interface SettingsButtonProps {
  label: string;
  text: string;
  onClick: () => void;
}

export default function SettingsButton({ label, text, onClick }: SettingsButtonProps) {
  return (
    <Container>
      <Label>
        {label}
        <Button onClick={onClick}>{text}</Button>
      </Label>
    </Container>
  );
}
