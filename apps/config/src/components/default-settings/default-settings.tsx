import React from "react";
import styled from "styled-components";
import Heading from "../heading/heading";
import SettingsListbox from "@components/settings-listbox/settings-listbox";
import SettingsSwitch from "@components/settings-switch/settings-switch";

const Section = styled.section`
  font-size: inherit;

  & > h1 {
    font-size: 2rem;
  }
`;

export default function DefaultSettings() {
  return (
    <Section>
      <Heading>Default Settings</Heading>
      <SettingsListbox
        label="Language"
        onChange={() => null}
        value="en"
        options={[
          { label: "English", value: "en" },
          { label: "German", value: "de" },
        ]}
      />
      <SettingsSwitch enabled={false} label="Bold font" onChange={() => null} />
      <SettingsSwitch
        enabled
        label="Copy manual content by clicking"
        onChange={() => null}
      />
      <SettingsSwitch
        enabled
        label="Exclude info in protocol"
        onChange={() => null}
      />
      <SettingsListbox
        label="Theme"
        onChange={() => null}
        value="light"
        options={[
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
        ]}
      />
      <SettingsListbox
        label="Font size"
        onChange={() => null}
        value="medium"
        options={[
          { label: "Small", value: "small" },
          { label: "Medium", value: "medium" },
          { label: "Large", value: "large" },
        ]}
      />
    </Section>
  );
}
