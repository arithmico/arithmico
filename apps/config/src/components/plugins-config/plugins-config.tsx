import React from "react";
import { getPluginStructures } from "@arithmico/engine";
import styled from "styled-components";
import Heading from "../heading/heading";
import PluginConfig from "../plugin-config/plugin-config";

const pluginStructures = getPluginStructures();

const Section = styled.section``;

export default function PluginsConfig() {
  return (
    <Section>
      <Heading>Functions and constants</Heading>
      {pluginStructures.map((pluginStructure) => (
        <PluginConfig
          key={pluginStructure.name}
          name={pluginStructure.name}
          items={pluginStructure.items.map((item) => ({
            name: item.name,
            description: item.description.en,
            synopsis: item.synopsis,
          }))}
        />
      ))}
    </Section>
  );
}
