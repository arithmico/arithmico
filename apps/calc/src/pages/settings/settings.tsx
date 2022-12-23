import React from "react";
import { useTranslation } from "react-i18next";
import SettingsSection from "@components/settings-section/settings-section";
import SettingsDecimalPlacesListbox from "@components/settings-decimal-places-listbox/settings-decimal-places-listbox";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import InterfaceSettings from "@local-components/settings-interface-section/settings-interface-section";
import AppearanceSettings from "@local-components/settings-appearance-section/settings-appearance-section";
import { useDispatch, useSelector } from "react-redux";
import { CalculatorRootState } from "@stores/calculator-store";
import {
  setAngleUnit,
  setDecimalPlaces,
  setNumberFormat,
} from "@stores/slices/settings";
import Listbox from "../../components/listbox/listbox";
import SettingsMiscellaneousSection from "../../components/settings-miscellaneous-section/settings-miscellaneous-section";

export default function Settings() {
  const dispatch = useDispatch();
  const significantDecimalPlaces = useSelector(
    (state: CalculatorRootState) => state.settings.decimalPlaces
  );
  const numberFormat = useSelector(
    (state: CalculatorRootState) => state.settings.numberFormat
  );
  const angleUnit = useSelector(
    (state: CalculatorRootState) => state.settings.angleUnit
  );

  const [t] = useTranslation();

  return (
    <WithScrollbars>
      <PageContainer>
        <InterfaceSettings />
        <AppearanceSettings />
        <SettingsSection heading={t("settings.calculator")}>
          <SettingsDecimalPlacesListbox
            onChange={(v: number) => dispatch(setDecimalPlaces(v))}
            label={t("settings.significantDecimalPlaces")}
            options={new Array(15)
              .fill(0)
              .map((_, index) => ({ label: index + "", value: index }))}
            value={significantDecimalPlaces}
          />
          <Listbox
            onChange={(v: string) => dispatch(setNumberFormat(v))}
            label={t("settings.numberFormat")}
            options={[
              { label: t("settings.numberFormat.default"), value: "default" },
              { label: t("settings.language.english"), value: "en" },
              { label: t("settings.language.german"), value: "de" },
            ]}
            value={numberFormat}
          />
          <Listbox
            onChange={(v: string) => dispatch(setAngleUnit(v))}
            label={t("settings.angleUnit")}
            options={[
              { label: t("settings.angleUnit.degrees"), value: "degrees" },
              { label: t("settings.angleUnit.radians"), value: "radians" },
            ]}
            value={angleUnit}
          />
        </SettingsSection>
        <SettingsMiscellaneousSection />
      </PageContainer>
    </WithScrollbars>
  );
}
