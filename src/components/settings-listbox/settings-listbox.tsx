import React from 'react';
import { Listbox } from '@headlessui/react';
import styled from 'styled-components';
import DoneIcon from '../../icons/done-icon';
import CodeIcon from '../../icons/code-icon';

const Container = styled.li`
  display: flex;
  align-items: center;
  height: 3rem;
  margin: 1rem 0;
`;

const Label = styled(Listbox.Label)`
  font-size: 2rem;
  font-weight: 300;
`;

const Button = styled(Listbox.Button)`
  display: flex;
  align-items: center;
  background-color: var(--me-background-300);
  outline: none;
  border: none;
  border-radius: 0.25rem;
  width: 200px;
  height: 100%;
  font-size: 2rem;
  color: var(--me-text-400);
  text-align: left;
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;
`;

const Options = styled(Listbox.Options)`
  position: absolute;
  z-index: 20;
  padding: 0;
  margin-top: 0.25rem;
`;

const Option = styled(Listbox.Option)`
  font-size: 2rem;
  background-color: var(--me-background-300);
  width: 200px;
  list-style: none;
  padding: 0.15rem 0.25rem 0.15rem 0.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--me-text-100);
  cursor: default;

  &:hover,
  &:focus {
    background-color: var(--me-background-400);
  }

  &:first-child {
    padding-top: 0.25rem;
    border-radius: 0.25rem 0.25rem 0 0;
  }

  &:last-child {
    border: none;
    padding-bottom: 0.25rem;
    border-radius: 0 0 0.25rem 0.25rem;
  }
`;

const ColumnLayout = styled.div`
  margin-left: auto;
  width: 200px;
  height: 3rem;
`;

const StyledCodeIcon = styled(CodeIcon)`
  transform: rotateZ(90deg);
  margin-left: auto;
  fill: var(--me-text-200);
`;

const StyledDoneIcon = styled(DoneIcon)`
  margin-left: auto;
  fill: var(--me-text-200);
`;

interface SettingsListboxProps {
  label: string;
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange: ((value: number) => void) | ((value: string) => void);
}

export default function SettingsListbox({ label, value, options, onChange }: SettingsListboxProps) {
  return (
    <Container>
      <Listbox value={value} onChange={onChange}>
        <Label>{label}</Label>
        <ColumnLayout>
          <Button>
            {options.find((option) => option.value === value)?.label}
            <StyledCodeIcon />
          </Button>
          <Options>
            {options.map((option, index) => (
              <Option key={index} value={option.value}>
                {option.label}
                {option.value === value ? <StyledDoneIcon /> : null}
              </Option>
            ))}
          </Options>
        </ColumnLayout>
      </Listbox>
    </Container>
  );
}
