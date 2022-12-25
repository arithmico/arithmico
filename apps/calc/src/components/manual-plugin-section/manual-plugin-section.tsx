import ManualSectionItem from "@local-components/manual-section-item/manual-section-item";
import ManualSection from "@local-components/manual-section/manual-section";
import {
  Language,
  PluginStructure,
  PluginStructureItem,
} from "@arithmico/engine/lib/types";

function matchDocumentation(
  item: PluginStructureItem,
  rawSearchStr: string,
  language: string
) {
  const searchStr = rawSearchStr.toLocaleLowerCase();
  const synopsis = item.synopsis[language as Language] ?? item.synopsis.en;
  const description =
    item.description[language as Language] ?? (item.description.en as string);

  return (
    synopsis.toLowerCase().includes(searchStr) ||
    description.toLowerCase().includes(searchStr)
  );
}

interface ManualPluginSectionProps {
  pluginStructure: PluginStructure;
  language: string;
  searchQuery: string;
}

export default function ManualPluginSection({
  pluginStructure,
  language,
  searchQuery,
}: ManualPluginSectionProps) {
  const filteredItems = pluginStructure.items.filter(
    (item) =>
      (item.type === "function" || item.type === "constant") &&
      matchDocumentation(item, searchQuery, language) &&
      item.enabled
  );

  if (filteredItems.length === 0) {
    return <></>;
  }

  return (
    <ManualSection
      name={
        language === "de" ? pluginStructure.name.de : pluginStructure.name.en
      }
    >
      {filteredItems.map((item) => (
        <ManualSectionItem
          key={item.name}
          synopsis={language === "de" ? item.synopsis.de : item.synopsis.en}
          description={
            (language === "de" ? item.description.de : item.description.en) ||
            ""
          }
        />
      ))}
    </ManualSection>
  );
}
