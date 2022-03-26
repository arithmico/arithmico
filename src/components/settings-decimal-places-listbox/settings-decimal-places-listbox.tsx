import React from 'react';
import { Listbox } from '@headlessui/react';
import styled from 'styled-components';
import codeIconSource from '../../icons/code_white_24dp.svg';

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
  background-color: #313131;
  outline: none;
  border: none;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  font-size: 2em;
  color: white;
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
  background-color: ${({ selected }) => (selected ? '#505050' : '#313131')};
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;

  &:hover {
    background-color: #505050;
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

const CodeIcon = styled.img`
  transform: rotate(90deg);
  margin-left: auto;
  opacity: 0.5;
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
            <CodeIcon src={codeIconSource} />
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
