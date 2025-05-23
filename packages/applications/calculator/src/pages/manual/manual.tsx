import React, { useRef, useState } from "react";
import { getDocumentation } from "engine";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import { useSelector } from "react-redux";
import ManualPluginSection from "@local-components/manual-plugin-section/manual-plugin-section";
import { useTranslation } from "react-i18next";
import ManualHotkeySection from "@local-components/manual-hotkey-section/manual-hotkey-section";
import classNames from "classnames";
import { ResponsiveTextInput } from "../../components/responsive-text-input/responsive-text-input";
import { CalculatorRootState } from "../../store/store";
import useTitle from "../../hooks/use-title";

const documentation = getDocumentation();

export default function Manual() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [t] = useTranslation();
  useTitle(t("title.manual"));

  const onSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(searchValue);
    }
  };

  const language = useSelector(
    (state: CalculatorRootState) => state.settings.language,
  );

  return (
    <WithScrollbars>
      <PageContainer className="flex flex-col">
        <label className="w-full">
          <span className="sr-only">{t("manual.search")}</span>
          <ResponsiveTextInput
            className={classNames("mb-4", "sm:mb-6", "md:mb-8", "lg:mb-12")}
            ref={searchRef}
            placeholder={t("manual.search") ?? undefined}
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            onKeyPress={onSearchEnter}
          />
        </label>
        {documentation.map((pluginStructure, index) => (
          <ManualPluginSection
            pluginStructure={pluginStructure}
            language={language}
            searchQuery={searchQuery}
            key={index}
          />
        ))}
        <ManualHotkeySection />
      </PageContainer>
    </WithScrollbars>
  );
}
