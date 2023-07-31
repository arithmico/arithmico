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

const documentation = getDocumentation();

export default function Manual() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [t] = useTranslation();

  const onSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(searchValue);
    }
  };

  const language = useSelector(
    (state: CalculatorRootState) => state.settings.language
  );

  return (
    <WithScrollbars>
      <PageContainer className="flex flex-col">
        <ResponsiveTextInput
          className={classNames(
            "mb-4",
            "sm:mb-6",
            "md:mb-8",
            "lg:mb-12",
            "theme-light:border-neutral-400",
            "theme-light:focus:border-neutral-600",
            "theme-light:bg-neutral-100",
            "theme-dark:bg-neutral-800",
            "theme-dark:border-neutral-500",
            "theme-dark:focus:border-neutral-100"
          )}
          ref={searchRef}
          placeholder={t("manual.search")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          onKeyPress={onSearchEnter}
        />
        {documentation.map((pluginStructure, index) => (
          <ManualPluginSection
            pluginStructure={pluginStructure}
            language={language}
            searchQuery={searchQuery}
            key={index}
          />
        ))}
        <ManualHotkeySection />
        {/*}
        <a
          href="https://docs.arithmico.com"
          className={classNames(
            "text-2xl",
            "mt-8",
            "text-neutral-500",
            "underline"
          )}
        >
          {t("manual.fullDocumentation")}
        </a>
        {*/}
      </PageContainer>
    </WithScrollbars>
  );
}
