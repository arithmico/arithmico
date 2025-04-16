import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  setCopySynopsisOnClick,
  setLanguage,
} from "../../store/slices/settings.slice";
import { CalculatorRootState } from "../../store/store";
import Switch from "../switch/switch";
import Listbox from "../listbox/listbox";
import SettingsSection from "../settings-section/settings-section";

export default function SettingsInterfaceSection() {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector(
    (state: CalculatorRootState) => state.settings.language,
  );
  const copySynopsisOnClick = useSelector(
    (state: CalculatorRootState) => state.settings.copySynopsisOnClick,
  );

  return (
    <SettingsSection heading={t("settings.interface")}>
      <Listbox
        onChange={(language: string) => {
          dispatch(setLanguage(language));
        }}
        label={t("settings.language")}
        options={[
          { label: t("settings.language.english"), value: "en" },
          { label: t("settings.language.french"), value: "fr" },
          { label: t("settings.language.german"), value: "de" },
          { label: t("settings.language.italian"), value: "it" },
        ]}
        value={language}
      />
      <Switch
        label={t("settings.copyManualContentByClicking")}
        enabled={copySynopsisOnClick}
        onChange={(copySynopsisOnClick: boolean) =>
          dispatch(setCopySynopsisOnClick(copySynopsisOnClick))
        }
      />
    </SettingsSection>
  );
}
