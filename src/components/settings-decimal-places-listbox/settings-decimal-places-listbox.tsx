import React from 'react';
import { Listbox } from '@headlessui/react';
import styled from 'styled-components';
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
  position: relative;
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
  width: 200px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 40px);
  position: relative;
  padding: 0;
  margin-top: 0.25rem;
`;

const Option = styled(Listbox.Option)<{ active: boolean }>`
  font-size: 1.5rem;
  background-color: ${({ selected }) =>
    selected ? 'var(--me-background-400)' : 'var(--me-background-300)'};
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;

  &:hover {
    background-color: var(--me-background-400);
  }

  &:first-child {
    border-radius: 0.25rem 0 0 0;
  }

  &:nth-child(5) {
    border-radius: 0 0.25rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.25rem 0;
  }

  &:nth-child(11) {
    border-radius: 0 0 0 0.25rem;
  }
`;

const ColumnLayout = styled.div`
  margin-left: auto;
  width: 200px;
  height: 3rem;
`;

const StyledCodeIcon = styled(CodeIcon)`
  transform: rotate(90deg);
  margin-left: auto;
  fill: var(--me-text-200);
`;

interface SettingsListboxProps {
  label: string;
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange: ((value: number) => void) | ((value: string) => void);
}

export default function SettingsDecimalPlacesListbox({
  label,
  value,
  options,
  onChange
}: SettingsListboxProps) {
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
              <Option key={index} value={option.value} selected={option.value === value}>
                {option.label}
              </Option>
            ))}
          </Options>
        </ColumnLayout>
      </Listbox>
    </Container>
  );
}
