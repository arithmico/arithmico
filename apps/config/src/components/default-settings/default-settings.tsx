import React from "react";
import styled from "styled-components";
import Heading from "../heading/heading";
import SettingsListbox from "@components/settings-listbox/settings-listbox";
import SettingsSwitch from "@components/settings-switch/settings-switch";
import SettingsDecimalPlacesListbox from "@components/settings-decimal-places-listbox/settings-decimal-places-listbox";

const Section = styled.section`
  font-size: inherit;
`;

export default function DefaultSettings() {
  return (
    <Section>
      <Heading>Default Settings</Heading>
      <Heading type={2}>Interface</Heading>
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

      <Heading type={2}>Appearance</Heading>
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

      <Heading type={2}>Calculator</Heading>
      <SettingsDecimalPlacesListbox
        label="Significant decimal places"
        options={new Array(15)
          .fill(0)
          .map((_, index) => ({ label: index.toString(), value: index }))}
        value={3}
        onChange={() => null}
      />
      <SettingsListbox
        label="Number format"
        onChange={() => null}
        value="en"
        options={[
          { label: "Default", value: "default" },
          { label: "English", value: "en" },
          { label: "German", value: "de" },
        ]}
      />
      <SettingsListbox
        label="Angle unit"
        onChange={() => null}
        value="degrees"
        options={[
          { label: "Degrees", value: "degrees" },
          { label: "Radians", value: "radians" },
        ]}
      />
    </Section>
  );
}
