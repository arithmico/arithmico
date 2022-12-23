import { useDispatch } from "react-redux";
import SettingsSection from "@components/settings-section/settings-section";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

export default function SettingsMiscellaneousSection() {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  return (
    <SettingsSection heading={t("settings.misc")}>
      <label className={classNames("flex", "items-center", "text-2xl")}>
        {t("settings.resetLabel")}
        <button
          className={classNames(
            "ml-auto",
            "p-2",
            "w-40",
            "rounded-md",
            "theme-dark:bg-neutral-700",
            "theme-dark:hover:bg-neutral-600"
          )}
          onClick={() => dispatch({ type: "resetSettings" })}
        >
          {t("settings.resetText")}
        </button>
      </label>
    </SettingsSection>
  );
}
