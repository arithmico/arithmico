import React from 'react';
import { Listbox } from '@headlessui/react';
import styled from 'styled-components';
import codeIconSource from '../../icons/code_white_24dp.svg';
import doneIconSource from '../../icons/done_white_24dp.svg';

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
  padding: 0;
  margin-top: 10px;
`;

const Option = styled(Listbox.Option)`
  font-size: 2em;
  background-color: var(--me-background-300);
  width: 200px;
  height: 50px;
  list-style: none;
  padding: 0 10px 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--me-background-200);
  cursor: default;

  &:hover,
  &:focus {
    background-color: #505050;
  }

  &:first-child {
    border-radius: 10px 10px 0 0;
  }

  &:last-child {
    border: none;
    border-radius: 0 0 10px 10px;
  }
`;

const ColumnLayout = styled.div`
  margin-left: auto;
  width: 200px;
  height: 50px;
`;

const CodeIcon = styled.img`
  transform: rotateZ(90deg);
  margin-left: auto;
  opacity: 0.5;
`;

const DoneIcon = styled.img`
  margin-left: auto;
  opacity: 0.5;
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
            <CodeIcon src={codeIconSource} />
          </Button>
          <Options>
            {options.map((option, index) => (
              <Option key={index} value={option.value}>
                {option.label}
                {option.value === value ? <DoneIcon src={doneIconSource} /> : null}
              </Option>
            ))}
          </Options>
        </ColumnLayout>
      </Listbox>
    </Container>
  );
}
