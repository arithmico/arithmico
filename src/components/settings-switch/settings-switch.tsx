import { Switch } from '@headlessui/react';
import React from 'react';
import styled from 'styled-components';

interface SettingsSwitchProps {
  onChange: (enabled: boolean) => void;
  enabled: boolean;
  label: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 10px 80px;
`;

const SwitchLabel = styled(Switch.Label)`
  font-size: 24px;
  font-weight: 300;
`;

const StyledSwitch = styled(Switch)<{ checked: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 2px;
  margin-left: auto;
  background-color: ${({ checked }) => (checked ? '#008871' : 'transparent')};
  border: 2px solid white;
  width: 70px;
  height: 35px;
  border-radius: calc(35px / 2);
  transition: background-color 0.25s;
`;

const SwitchIndicator = styled.div<{ enabled: boolean }>`
  width: 27px;
  height: 27px;
  border-radius: 14px;
  margin-left: ${({ enabled }) => (enabled ? '35px' : '0')};
  background-color: white;
  transition: margin 0.25s;
`;

export default function SettingsSwitch({ label, enabled, onChange }: SettingsSwitchProps) {
  return (
    <Container>
      <Switch.Group>
        <SwitchLabel>{label}</SwitchLabel>
        <StyledSwitch checked={enabled} onChange={onChange}>
          <SwitchIndicator enabled={enabled} aria-hidden="true" />
        </StyledSwitch>
      </Switch.Group>
    </Container>
  );
}
