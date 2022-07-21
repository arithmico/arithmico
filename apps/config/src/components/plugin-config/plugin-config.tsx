import React from "react";
import PluginObjectToggle from "../plugin-object-toggle/plugin-object-toggle";
import styled from "styled-components";

interface PluginItemProps {
  name: string;
  synopsis: string;
  description: string;
}

interface PluginConfigProps {
  name: string;
  items: PluginItemProps[];
}

const PluginTitle = styled.h1`
  font-size: 2.5em;
  font-weight: var(--me-font-weight-normal);
  margin-bottom: 0.5em;
  margin-top: 2em;
  color: var(--me-text-400);
`;

const PluginObjectsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default function PluginConfig({ name, items }: PluginConfigProps) {
  return (
    <section>
      <PluginTitle>{name}</PluginTitle>
      <PluginObjectsList>
        {items.map((item, index) => (
          <PluginObjectToggle
            key={index}
            enabled
            label={item.synopsis}
            onChange={() => null}
          ></PluginObjectToggle>
        ))}
      </PluginObjectsList>
    </section>
  );
}
