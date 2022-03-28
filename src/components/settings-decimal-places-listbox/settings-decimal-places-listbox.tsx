import React from 'react';
import { Listbox } from '@headlessui/react';
import styled from 'styled-components';
import CodeIcon from '../../icons/code-icon';

const Container = styled.li`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 10px 0;
`;

const Label = styled(Listbox.Label)`
  font-size: 2em;
  font-weight: 300;
`;

const Button = styled(Listbox.Button)`
  display: flex;
  align-items: center;
  background-color: var(--me-background-300);
  outline: none;
  border: none;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  font-size: 2em;
  color: var(--me-text-400);
  text-align: left;
  padding: 0 10px 0 20px;
`;

const Options = styled(Listbox.Options)`
  position: absolute;
  z-index: 20;
  width: 200px;
  height: calc(200px / 5 * 3);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: relative;
  padding: 0;
  margin-top: 10px;
`;

const Option = styled(Listbox.Option)<{ active: boolean }>`
  font-size: 1.5em;
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
    border-radius: 10px 0 0 0;
  }

  &:nth-child(5) {
    border-radius: 0 10px 0 0;
  }

  &:last-child {
    border-radius: 0 0 10px 0px;
  }

  &:nth-child(11) {
    border-radius: 0 0 0 10px;
  }
`;

const ColumnLayout = styled.div`
  margin-left: auto;
  width: 200px;
  height: 50px;
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
