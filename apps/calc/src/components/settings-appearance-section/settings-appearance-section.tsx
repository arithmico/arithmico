import React from "react";
import SettingsListbox from "@components/settings-listbox/settings-listbox";
import { useSelector, useDispatch } from "react-redux";
import SettingsSection from "@components/settings-section/settings-section";
import SettingsSwitch from "@components/settings-switch/settings-switch";
import { useTranslation } from "react-i18next";
import {
  selectBoldFont,
  selectFontSize,
  selectTheme,
} from "@stores/calculator-selectors";
import {
  setBoldFont,
  setFontSize,
  setTheme,
} from "@stores/global-slices/appearance-settings-slice";

export default function SettingsAppearanceSection() {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const fontSize = useSelector(selectFontSize);
  const boldFont = useSelector(selectBoldFont);

  return (
    <SettingsSection heading={t("settings.appearance")}>
      <SettingsListbox
        onChange={(theme: string) => dispatch(setTheme(theme))}
        label={t("settings.theme")}
        options={[
          { label: t("settings.theme.light"), value: "light" },
          { label: t("settings.theme.dark"), value: "dark" },
        ]}
        value={theme}
      />
      <SettingsListbox
        onChange={(fontSize: string) => dispatch(setFontSize(fontSize))}
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
        onChange={(boldFont: boolean) => dispatch(setBoldFont(boldFont))}
      />
    </SettingsSection>
  );
}
