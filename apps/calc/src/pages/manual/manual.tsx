import React, { useRef, useState } from "react";
import { getDocumentation } from "@arithmico/engine";
import { GlobalDocumentationItem } from "@arithmico/engine/lib/types/Plugin";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import { useSelector } from "react-redux";
import { CalculatorRootState } from "@stores/calculator-store";
import ManualPluginSection from "@local-components/manual-plugin-section/manual-plugin-section";
import { useTranslation } from "react-i18next";
import ManualHotkeySection from "@local-components/manual-hotkey-section/manual-hotkey-section";
import classNames from "classnames";

function groupByPlugin(items: GlobalDocumentationItem[]) {
  const result = new Map<string, GlobalDocumentationItem[]>();
  items.forEach((item) => {
    const resultEntry = result.get(item.plugin);
    if (resultEntry) {
      resultEntry.push(item);
    } else {
      result.set(item.plugin, [item]);
    }
  });
  return result;
}

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

  const plugins = groupByPlugin(getDocumentation());

  return (
    <WithScrollbars>
      <PageContainer className="flex flex-col">
        <input
          type="text"
          className={classNames(
            "w-full",
            "text-4xl",
            "outline-none",
            "border",
            "px-4",
            "py-6",
            "rounded-md",
            "mb-12",
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
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={onSearchEnter}
        />
        {[...plugins.entries()].map(([pluginName, pluginItems], index) => (
          <ManualPluginSection
            pluginName={pluginName}
            documentation={pluginItems}
            language={language}
            searchQuery={searchQuery}
            key={index}
          />
        ))}
        <ManualHotkeySection />
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
      </PageContainer>
    </WithScrollbars>
  );
}
