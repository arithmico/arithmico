import React from "react";
import PluginConfig from "../../components/plugin-config/plugin-config";
import Page from "../../components/page/page";

export default function Home() {
  return (
    <Page>
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
