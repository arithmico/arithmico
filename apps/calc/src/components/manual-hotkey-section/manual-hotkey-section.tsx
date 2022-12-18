import ManualSectionItem from "@local-components/manual-section-item/manual-section-item";
import { useTranslation } from "react-i18next";
import hotkeys from "../../hotkeys.json";
import ManualSection from "@local-components/manual-section/manual-section";

export default function ManualHotkeySection() {
  const [t] = useTranslation();

  return (
    <ManualSection name={t("hotkeys")}>
      {Object.entries(hotkeys as Record<string, string>).map(
        ([key, value], index) => (
          <ManualSectionItem
            synopsis={key}
            description={t(value)}
            key={index}
          />
        )
      )}
    </ManualSection>
  );
}
