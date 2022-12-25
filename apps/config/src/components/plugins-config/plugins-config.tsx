import React from "react";
import { getDocumentation } from "@arithmico/engine";
import styled from "styled-components";
import Heading from "../heading/heading";
import PluginConfig from "../plugin-config/plugin-config";

const pluginStructures = getDocumentation();

const Section = styled.section``;

export default function PluginsConfig() {
  return (
    <Section>
      <Heading>Functions and constants</Heading>
      {pluginStructures.map((pluginStructure) => (
        <PluginConfig
          key={pluginStructure.name.en}
          name={pluginStructure.name.en}
          items={pluginStructure.items.map((item) => ({
            name: item.name,
            description: item.description.en || "",
            synopsis: item.synopsis.en,
          }))}
        />
      ))}
    </Section>
  );
}
