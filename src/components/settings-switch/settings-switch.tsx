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
  padding: 10px 0;
`;

const SwitchLabel = styled(Switch.Label)`
  font-size: 2em;
  font-weight: 300;
`;

const StyledSwitch = styled(Switch)<{ checked: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 2px;
  margin-left: auto;
  background-color: ${({ checked }) =>
    checked ? 'var(--me-enabled)' : 'var(--me-background-300)'};
  border: none;
  width: 70px;
  height: 35px;
  border-radius: calc(35px / 2);
  transition: background-color 0.25s;
`;

const SwitchIndicator = styled.div<{ enabled: boolean }>`
  width: 27px;
  height: 27px;
  border-radius: 14px;
  margin-left: ${({ enabled }) => (enabled ? '35px' : '2px')};
  background-color: var(--me-text-400);
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
