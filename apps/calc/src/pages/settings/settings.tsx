import React from "react";
import { useTranslation } from "react-i18next";
import SettingsButton from "@components/settings-button/settings-button";
import SettingsListbox from "@components/settings-listbox/settings-listbox";
import SettingsSection from "@components/settings-section/settings-section";
import SettingsSwitch from "@components/settings-switch/settings-switch";
import SettingsDecimalPlacesListbox from "@components/settings-decimal-places-listbox/settings-decimal-places-listbox";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import useSessionStore, {
  useDispatch,
} from "../../stores/session-store/use-session-store";
import InterfaceSettings from "@local-components/interface-settings/interface-settings";

export default function Settings() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useSessionStore((state) => [
    state.settings.theme,
    (theme: string) => dispatch({ type: "setTheme", theme }),
  ]);
  const [boldFont, setBoldFont] = useSessionStore((state) => [
    state.settings.boldFont,
    (boldFont: boolean) => dispatch({ type: "setBoldFont", boldFont }),
  ]);
  const [fontSize, setFontSize] = useSessionStore((state) => [
    state.settings.interfaceFontSize,
    (interfaceFontSize: string) =>
      dispatch({ type: "setInterfaceFontSize", interfaceFontSize }),
  ]);
  const [significantDecimalPlaces, setSignificantDecimalPlaces] =
    useSessionStore((state) => [
      state.settings.decimalPlaces,
      (decimalPlaces: number) =>
        dispatch({ type: "setDecimalPlaces", decimalPlaces }),
    ]);
  const [numberFormat, setNumberFormat] = useSessionStore((state) => [
    state.settings.numberFormat,
    (numberFormat: string) =>
      dispatch({ type: "setNumberFormat", numberFormat }),
  ]);
  const [angleUnit, setAngleUnit] = useSessionStore((state) => [
    state.settings.angleUnit,
    (angleUnit: string) => dispatch({ type: "setAngleUnit", angleUnit }),
  ]);

  const [t] = useTranslation();

  return (
    <WithScrollbars>
      <PageContainer>
        <InterfaceSettings />

        <SettingsSection heading={t("settings.appearance")}>
          <SettingsListbox
            onChange={setTheme}
            label={t("settings.theme")}
            options={[
              { label: t("settings.theme.light"), value: "light" },
              { label: t("settings.theme.dark"), value: "dark" },
            ]}
            value={theme}
          />
          <SettingsListbox
            onChange={(v: string) => setFontSize(v)}
            label={t("settings.fontSize")}
            options={[
              { label: t("settings.fontSize.small"), value: "small" },
              { label: t("settings.fontSize.medium"), value: "medium" },
              { label: t("settings.fontSize.large"), value: "large" },
            ]}
            value={fontSize}
          />
          <SettingsSwitch
            label={t("settings.boldFont")}
            enabled={boldFont}
            onChange={setBoldFont}
          />
        </SettingsSection>

        <SettingsSection heading={t("settings.calculator")}>
          <SettingsDecimalPlacesListbox
            onChange={setSignificantDecimalPlaces}
            label={t("settings.significantDecimalPlaces")}
            options={new Array(15)
              .fill(0)
              .map((_, index) => ({ label: index + "", value: index }))}
            value={significantDecimalPlaces}
          />
          <SettingsListbox
            onChange={setNumberFormat}
            label={t("settings.numberFormat")}
            options={[
              { label: t("settings.numberFormat.default"), value: "default" },
              { label: t("settings.language.english"), value: "en" },
              { label: t("settings.language.german"), value: "de" },
            ]}
            value={numberFormat}
          />
          <SettingsListbox
            onChange={(v: string) => setAngleUnit(v)}
            label={t("settings.angleUnit")}
            options={[
              { label: t("settings.angleUnit.degrees"), value: "degrees" },
              { label: t("settings.angleUnit.radians"), value: "radians" },
            ]}
            value={angleUnit}
          />
        </SettingsSection>
        <SettingsSection heading={t("settings.misc")}>
          <SettingsButton
            label={t("settings.resetLabel")}
            text={t("settings.resetText")}
            onClick={() => dispatch({ type: "resetSettings" })}
          />
        </SettingsSection>
      </PageContainer>
    </WithScrollbars>
  );
}
