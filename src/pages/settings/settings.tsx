import React from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '../../components/page-container/page-container';
import SettingsDecimalPlacesListbox from '../../components/settings-decimal-places-listbox/settings-decimal-places-listbox';
import SettingsListbox from '../../components/settings-listbox/settings-listbox';
import SettingsSection from '../../components/settings-section/settings-section';
import SettingsSwitch from '../../components/settings-switch/settings-switch';
import WithScrollbars from '../../components/with-scrollbars/with-scrollbars';
import useSessionStore from '../../stores/session-store/use-session-store';

export default function Settings() {
  const [language, setLanguage] = useSessionStore((state) => [state.language, state.setLanguage]);
  const [copyMaualContentByClicking, setCopyMaualContentByClicking] = useSessionStore((state) => [
    state.copySynopsisOnClick,
    state.setCopySynopsisOnClick
  ]);
  const [theme, setTheme] = useSessionStore((state) => [state.theme, state.setTheme]);
  const [fontSize, setFontSize] = useSessionStore((state) => [
    state.interfaceFontSize,
    state.setInterfaceFontSize
  ]);
  const [significantDecimalPlaces, setSignificantDecimalPlaces] = useSessionStore((state) => [
    state.decimalPlaces,
    state.setDecimalPlaces
  ]);
  const [numberFormat, setNumberFormat] = useSessionStore((state) => [
    state.numberFormat,
    state.setNumberFormat
  ]);
  //const [enableAnalytics, setEnableAnalytics] = useState(true);
  const [excludeInfo, setExcludeInfo] = useSessionStore((state) => [
    state.excludeInfoInProtocol,
    state.setExcludeInfoInProtocol
  ]);
  const [t] = useTranslation();

  return (
    <WithScrollbars>
      <PageContainer>
        <SettingsSection heading={t('settings.interface')}>
          <SettingsListbox
            onChange={setLanguage}
            label={t('settings.language')}
            options={[
              { label: t('settings.language.english'), value: 'en' },
              { label: t('settings.language.german'), value: 'de' }
            ]}
            value={language}
          />
          <SettingsSwitch
            label={t('settings.copyManualContentByClicking')}
            enabled={copyMaualContentByClicking}
            onChange={setCopyMaualContentByClicking}
          />
          <SettingsSwitch
            label={t('settings.excludeInfoInProtocol')}
            enabled={excludeInfo}
            onChange={setExcludeInfo}
          />
        </SettingsSection>

        <SettingsSection heading={t('settings.appearance')}>
          <SettingsListbox
            onChange={setTheme}
            label={t('settings.theme')}
            options={[
              { label: t('settings.theme.light'), value: 'light' },
              { label: t('settings.theme.dark'), value: 'dark' }
            ]}
            value={theme}
          />
          <SettingsListbox
            onChange={(v: string) => setFontSize(v)}
            label={t('settings.fontSize')}
            options={[
              { label: t('settings.fontSize.small'), value: 'small' },
              { label: t('settings.fontSize.medium'), value: 'medium' },
              { label: t('settings.fontSize.large'), value: 'large' }
            ]}
            value={fontSize}
          />
        </SettingsSection>

        <SettingsSection heading={t('settings.calculator')}>
          <SettingsDecimalPlacesListbox
            onChange={setSignificantDecimalPlaces}
            label={t('settings.significantDecimalPlaces')}
            options={new Array(15).fill(0).map((_, index) => ({ label: index + '', value: index }))}
            value={significantDecimalPlaces}
          />
          <SettingsListbox
            onChange={setNumberFormat}
            label={t('settings.numberFormat')}
            options={[
              { label: t('settings.numberFormat.default'), value: 'default' },
              { label: t('settings.language.english'), value: 'en' },
              { label: t('settings.language.german'), value: 'de' }
            ]}
            value={numberFormat}
          />
        </SettingsSection>
        {/*<SettingsSection heading="Miscellaneous">
        <SettingsSwitch
          label="Use Analytics"
          enabled={enableAnalytics}
          onChange={setEnableAnalytics}
          />
      </SettingsSection>*/}
      </PageContainer>
    </WithScrollbars>
  );
}
