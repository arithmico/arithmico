import React from "react";
import { Switch } from "@headlessui/react";
import styled from "styled-components";

interface PluginObjectToggleProps {
  onChange: (enabled: boolean) => void;
  enabled: boolean;
  label: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: var(--me-background-200);
  border-radius: 0.5rem;
  margin: 0.5rem 0;
`;

const SwitchLabel = styled(Switch.Label)`
  font-size: 2em;
  font-weight: var(--me-font-weight-normal);
`;

const StyledSwitch = styled(Switch)<{ checked: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 2px;
  margin-left: auto;
  background-color: ${({ checked }) =>
    checked ? "var(--me-enabled)" : "var(--me-background-300)"};
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
  margin-left: ${({ enabled }) => (enabled ? "36px" : "2px")};
  background-color: var(--me-switch-handle);
  transition: margin 0.25s;
`;

export default function PluginObjectToggle({
  label,
  enabled,
  onChange,
}: PluginObjectToggleProps) {
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
