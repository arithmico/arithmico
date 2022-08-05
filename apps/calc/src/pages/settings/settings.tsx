import React from "react";
import { useTranslation } from "react-i18next";
import SettingsButton from "@components/settings-button/settings-button";
import SettingsListbox from "@components/settings-listbox/settings-listbox";
import SettingsSection from "@components/settings-section/settings-section";
import SettingsDecimalPlacesListbox from "@components/settings-decimal-places-listbox/settings-decimal-places-listbox";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import useSessionStore, {
  useDispatch,
} from "../../stores/session-store/use-session-store";
import InterfaceSettings from "@local-components/settings-interface-section/settings-interface-section";
import AppearanceSettings from "@local-components/settings-appearance-section/settings-appearance-section";

export default function Settings() {
  const dispatch = useDispatch();
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
        <AppearanceSettings />
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
