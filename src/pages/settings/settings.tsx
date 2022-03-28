import React, { useState } from 'react';
import PageContainer from '../../components/page-container/page-container';
import SettingsDecimalPlacesListbox from '../../components/settings-decimal-places-listbox/settings-decimal-places-listbox';
import SettingsListbox from '../../components/settings-listbox/settings-listbox';
import SettingsSection from '../../components/settings-section/settings-section';
import SettingsSwitch from '../../components/settings-switch/settings-switch';
import useSessionStore from '../../stores/session-store/use-session-store';

export default function Settings() {
  const [language, setLanguage] = useState('english');
  const [copyMaualContentByClicking, setCopyMaualContentByClicking] = useState(true);
  const [theme, setTheme] = useSessionStore((state) => [state.theme, state.setTheme]);
  const [fontSize, setFontSize] = useSessionStore((state) => [
    state.interfaceFontSize,
    state.setInterfaceFontSize
  ]);
  const [significantDecimalPlaces, setSignificantDecimalPlaces] = useSessionStore((state) => [
    state.decimalPlaces,
    state.setDecimalPlaces
  ]);
  const [numberFormat, setNumberFormat] = useState('default');
  const [enableAnalytics, setEnableAnalytics] = useState(true);

  return (
    <PageContainer>
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
          onChange={(v: string) => setFontSize(v)}
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
          label="Use Analytics"
          enabled={enableAnalytics}
          onChange={setEnableAnalytics}
        />
      </SettingsSection>
    </PageContainer>
  );
}
