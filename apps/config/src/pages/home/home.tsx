import React from "react";
import Page from "../../components/page/page";
import DefaultSettings from "../../components/default-settings/default-settings";
import PluginsConfig from "../../components/plugins-config/plugins-config";
import styled from "styled-components";

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--me-background-300);
  outline: none;
  border: none;
  border-radius: 0.25rem;
  font-size: 2rem;
  color: var(--me-text-400);
  justify-content: center;
  padding: 0.25rem 1rem;
  font-weight: var(--me-font-weight-normal);
  margin: 2rem 0;

  &:hover {
    background-color: var(--me-background-400);
  }
`;

export default function Home() {
  return (
    <Page>
      <DefaultSettings />
      <PluginsConfig />
      <Button>Download Profile</Button>
    </Page>
  );
}
