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
      <SettingsSwitch enabled label="Bold font" onChange={() => null} />
    </Section>
  );
}
