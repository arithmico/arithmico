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
import { StartSearchButton } from "@pages/manual/components/start-search-button";

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
        <div
          className={classNames(
            "grid",
            "grid-cols-[1fr_auto]",
            "mx-2",
            "mb-4",
            "sm:mb-6",
            "md:mb-8",
            "lg:mb-12",
          )}
        >
          <label id="search-field-label">
            <span className="sr-only">{t("manual.search")}</span>
          </label>
          <ResponsiveTextInput
            className={classNames("col-start-1", "rounded-l-sm")}
            aria-labelledby="search-field-label"
            ref={searchRef}
            placeholder={t("manual.search") ?? undefined}
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            onKeyPress={onSearchEnter}
          />
          <StartSearchButton
            text={t("toolbar.startSearch")}
            onClick={() => setSearchQuery(searchValue)}
          />
        </div>
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
