import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setBoldFont, setFontSize, setTheme } from "@stores/slices/settings";
import { CalculatorRootState } from "@stores/calculator-store";
import Switch from "../switch/switch";
import Listbox from "../listbox/listbox";
import SettingsSection from "../settings-section/settings-section";

export default function SettingsAppearanceSection() {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector(
    (state: CalculatorRootState) => state.settings.theme
  );
  const fontSize = useSelector(
    (state: CalculatorRootState) => state.settings.fontSize
  );
  const boldFont = useSelector(
    (state: CalculatorRootState) => state.settings.boldFont
  );

  return (
    <SettingsSection heading={t("settings.appearance")}>
      <Listbox
        onChange={(theme: string) => dispatch(setTheme(theme))}
        label={t("settings.theme")}
        options={[
          { label: t("settings.theme.light"), value: "light" },
          { label: t("settings.theme.dark"), value: "dark" },
        ]}
        value={theme}
      />
      <Listbox
        onChange={(fontSize: string) => dispatch(setFontSize(fontSize))}
        label={t("settings.fontSize")}
        options={[
          { label: t("settings.fontSize.small"), value: "small" },
          { label: t("settings.fontSize.medium"), value: "medium" },
          { label: t("settings.fontSize.large"), value: "large" },
        ]}
        value={fontSize}
      />
      <Switch
        label={t("settings.boldFont")}
        enabled={boldFont}
        onChange={(boldFont: boolean) => dispatch(setBoldFont(boldFont))}
      />
    </SettingsSection>
  );
}
