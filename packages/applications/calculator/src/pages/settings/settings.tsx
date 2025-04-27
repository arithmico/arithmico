import { useTranslation } from "react-i18next";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import InterfaceSettings from "@local-components/settings-interface-section/settings-interface-section";
import AppearanceSettings from "@local-components/settings-appearance-section/settings-appearance-section";
import { useDispatch, useSelector } from "react-redux";
import {
  setAngleUnit,
  setDecimalPlaces,
  setNumberFormat,
} from "../../store/slices/settings.slice";
import Listbox from "../../components/listbox/listbox";
import SettingsMiscellaneousSection from "../../components/settings-miscellaneous-section/settings-miscellaneous-section";
import DecimalPlacesListbox from "../../components/decimal-places-listbox/decimal-places-listbox";
import SettingsSection from "../../components/settings-section/settings-section";
import { CalculatorRootState } from "../../store/store";
import React from "react";
import useTitle from "../../hooks/use-title";

export default function Settings() {
  const dispatch = useDispatch();
  const significantDecimalPlaces = useSelector(
    (state: CalculatorRootState) => state.settings.decimalPlaces,
  );
  const numberFormat = useSelector(
    (state: CalculatorRootState) => state.settings.numberFormat,
  );
  const angleUnit = useSelector(
    (state: CalculatorRootState) => state.settings.angleUnit,
  );

  const [t] = useTranslation();
  useTitle(t("title.settings"));

  return (
    <WithScrollbars>
      <PageContainer>
        <InterfaceSettings />
        <AppearanceSettings />
        <SettingsSection heading={t("settings.calculator")}>
          <DecimalPlacesListbox
            onChange={(v: number) => dispatch(setDecimalPlaces(v))}
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
