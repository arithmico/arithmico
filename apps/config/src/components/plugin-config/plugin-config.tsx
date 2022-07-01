import React from "react";
import SettingsSection from "@components/settings-section/settings-section";
import SettingsSwitch from "@components/settings-switch/settings-switch";

interface PluginItemProps {
  name: string;
  synopsis: string;
  description: string;
}

interface PluginConfigProps {
  name: string;
  items: PluginItemProps[];
}

export default function PluginConfig({ name, items }: PluginConfigProps) {
  return (
    <SettingsSection heading={name}>
      {items.map((item, index) => (
        <SettingsSwitch
          key={index}
          enabled
          label={item.synopsis}
          onChange={() => null}
        ></SettingsSwitch>
      ))}
    </SettingsSection>
  );
}
