import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsListbox from "@components/settings-listbox/settings-listbox";
import SettingsSection from "@components/settings-section/settings-section";
import SettingsSwitch from "@components/settings-switch/settings-switch";
import {
  selectCopySynopsisOnClick,
  selectExcludeInfoInProtocol,
  selectLanguage,
} from "@stores/calculator-selectors";
import { setLanguage } from "@stores/global-slices/langugage-settings-slice";
import { useTranslation } from "react-i18next";
import {
  setCopySynopsisOnClick,
  setExcludeInfoInProtocol,
} from "@stores/calc-slices/calculator-settings-slice";

export default function SettingsInterfaceSection() {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const copySynopsisOnClick = useSelector(selectCopySynopsisOnClick);
  const excludeInfoInProtocol = useSelector(selectExcludeInfoInProtocol);

  return (
    <SettingsSection heading={t("settings.interface")}>
      <SettingsListbox
        onChange={(language: string) => dispatch(setLanguage(language))}
        label={t("settings.language")}
        options={[
          { label: t("settings.language.english"), value: "en" },
          { label: t("settings.language.german"), value: "de" },
        ]}
        value={language}
      />
      <SettingsSwitch
        label={t("settings.copyManualContentByClicking")}
        enabled={copySynopsisOnClick}
        onChange={(copySynopsisOnClick: boolean) =>
          dispatch(setCopySynopsisOnClick(copySynopsisOnClick))
        }
      />
      <SettingsSwitch
        label={t("settings.excludeInfoInProtocol")}
        enabled={excludeInfoInProtocol}
        onChange={(excludeInfoInProtocol) =>
          dispatch(setExcludeInfoInProtocol(excludeInfoInProtocol))
        }
      />
    </SettingsSection>
  );
}
