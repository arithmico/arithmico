import React, {useRef, useState} from "react";
import {getDocumentation} from "@arithmico/engine";
import {GlobalDocumentationItem} from "@arithmico/engine/lib/types/Plugin";
import styled from "styled-components";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import ExternalLink from "@local-components/external-link/external-link";
import {useSelector} from "react-redux";
import {CalculatorRootState} from "@stores/calculator-store";
import ManualPluginSection from "@local-components/manual-plugin-section/manual-plugin-section";
import {useTranslation} from "react-i18next";
import ManualHotkeySection from "@local-components/manual-hotkey-section/manual-hotkey-section";

const DocumentationLink = styled(ExternalLink)`
  font-size: 2rem;
  margin-top: 2rem;
  display: block;
  text-decoration: underline;
`;

const SearchField = styled.input.attrs({ type: "search" })`
  margin-top: 2em;
  background-color: var(--me-background-100);
  outline: none;
  border: thin solid var(--me-text-200);
  border-radius: 10px;
  width: 100%;
  min-width: 100px;
  font-size: 2.5em;
  font-weight: var(--me-font-weight-normal);
  color: var(--me-text-400);
  padding: 0.6em 0.75em;

  &::placeholder {
    color: var(--me-text-100);
  }

  &:focus {
    border: thin solid var(--me-text-400);
  }
`;

function groupByPlugin(items: GlobalDocumentationItem[]) {
  const result = new Map<string, GlobalDocumentationItem[]>();
  items.forEach((item) => {
    if (result.has(item.plugin)) {
      result.get(item.plugin).push(item);
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
      <PageContainer>
        <SearchField
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
        <DocumentationLink href="https://docs.arithmico.com">
          {t("manual.fullDocumentation")}
        </DocumentationLink>
      </PageContainer>
    </WithScrollbars>
  );
}
