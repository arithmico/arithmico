import ManualSectionItem from "@local-components/manual-section-item/manual-section-item";
import React from "react";
import { GlobalDocumentationItem } from "@arithmico/engine/lib/types/Plugin";
import ManualSection from "@local-components/manual-section/manual-section";

function matchDocumentation(
  item: GlobalDocumentationItem,
  rawSearchStr: string,
  language: string
) {
  const searchStr = rawSearchStr.toLocaleLowerCase();
  const doc = item.documentation[language as "en" | "de"];
  if (doc) {
    return (
      doc.synopsis.toLowerCase().includes(searchStr) ||
      doc.description.toLowerCase().includes(searchStr)
    );
  }

  const fallbackDoc = item.documentation.en;

  if (fallbackDoc) {
    return (
      fallbackDoc.synopsis.toLowerCase().includes(searchStr) ||
      fallbackDoc.description.toLowerCase().includes(searchStr)
    );
  }

  return false;
}

interface ManualPluginSectionProps {
  pluginName: string;
  documentation: GlobalDocumentationItem[];
  language: string;
  searchQuery: string;
}

export default function ManualPluginSection({
  pluginName,
  documentation,
  language,
  searchQuery,
}: ManualPluginSectionProps) {
  return (
    <ManualSection name={pluginName}>
      {documentation
        .filter(
          (item) =>
            (item.type === "function" || item.type === "constant") &&
            matchDocumentation(item, searchQuery, language)
        )
        .map((item) => (
          <ManualSectionItem
            key={item.documentation.en?.synopsis}
            synopsis={item.documentation.en?.synopsis || ""}
            description={
              (language === "de"
                ? item.documentation.de?.description
                : item.documentation.en?.description) || ""
            }
          />
        ))}
    </ManualSection>
  );
}
