import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { resetSettings } from "../../store/slices/settings.slice";
import SettingsSection from "../settings-section/settings-section";

export default function SettingsMiscellaneousSection() {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  return (
    <SettingsSection heading={t("settings.misc")}>
      <label
        className={classNames(
          "flex",
          "items-center",
          "text-2xl",
          "bold-font:font-bold"
        )}
      >
        {t("settings.resetLabel")}
        <button
          className={classNames(
            "ml-auto",
            "p-2",
            "w-40",
            "rounded-md",
            "theme-dark:bg-neutral-700",
            "theme-dark:hover:bg-neutral-600",
            "theme-light:bg-neutral-300",
            "theme-light:hover:bg-neutral-400"
          )}
          onClick={() => dispatch(resetSettings())}
        >
          {t("settings.resetText")}
        </button>
      </label>
    </SettingsSection>
  );
}
