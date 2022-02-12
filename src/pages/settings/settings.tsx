import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsDecimalPlacesListbox from '../../components/settings-decimal-places-listbox/settings-decimal-places-listbox';
import SettingsListbox from '../../components/settings-listbox/settings-listbox';
import SettingsSection from '../../components/settings-section/settings-section';
import SettingsSwitch from '../../components/settings-switch/settings-switch';

const Container = styled.main`
  margin: 50px 20%;
`;

export default function Settings() {
  const [language, setLanguage] = useState('english');
  const [copyMaualContentByClicking, setCopyMaualContentByClicking] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('medium');
  const [significantDecimalPlaces, setSignificantDecimalPlaces] = useState(5);
  const [numberFormat, setNumberFormat] = useState('default');
  const [enableAnalytics, setEnableAnalytics] = useState(true);

  return (
    <Container>
      <SettingsSection heading="Interface">
        <SettingsListbox
          onChange={setLanguage}
          label="Language"
          options={[
            { label: 'English', value: 'english' },
            { label: 'German', value: 'german' }
          ]}
          value={language}
        />
        <SettingsSwitch
          label="Copy manual content by clicking"
          enabled={copyMaualContentByClicking}
          onChange={setCopyMaualContentByClicking}
        />
      </SettingsSection>

      <SettingsSection heading="Appearance">
        <SettingsListbox
          onChange={setTheme}
          label="Theme"
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' }
          ]}
          value={theme}
        />
        <SettingsListbox
          onChange={setFontSize}
          label="Font size"
          options={[
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' }
          ]}
          value={fontSize}
        />
      </SettingsSection>

      <SettingsSection heading="Calculator">
        <SettingsDecimalPlacesListbox
          onChange={setSignificantDecimalPlaces}
          label="Significant decimal places"
          options={new Array(15).fill(0).map((_, index) => ({ label: index + '', value: index }))}
          value={significantDecimalPlaces}
        />
        <SettingsListbox
          onChange={setNumberFormat}
          label="Number format"
          options={[
            { label: 'Default', value: 'default' },
            { label: 'English', value: 'english' },
            { label: 'German', value: 'german' }
          ]}
          value={numberFormat}
        />
      </SettingsSection>

      <SettingsSection heading="Miscellaneous">
        <SettingsSwitch
          label="Google Analytics"
          enabled={enableAnalytics}
          onChange={setEnableAnalytics}
        />
      </SettingsSection>
    </Container>
  );
}
