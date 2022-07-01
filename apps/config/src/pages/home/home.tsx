import React from "react";
import PluginConfig from "../../components/plugin-config/plugin-config";
import Page from "../../components/page/page";
import { getPluginStructures } from "@behrenle/number-cruncher";
const pluginStructures = getPluginStructures();

export default function Home() {
  return (
    <Page>
      {pluginStructures.map((pluginStructure) => (
        <PluginConfig
          name={pluginStructure.name}
          items={pluginStructure.items.map((item) => ({
            name: item.name,
            description: item.description.en,
            synopsis: item.synopsis,
          }))}
        />
      ))}
      <PluginConfig
        name="foo"
        items={[
          {
            name: "foo_bar",
            description: "example description",
            synopsis: "FOO_BAR",
          },
        ]}
      />
    </Page>
  );
}
