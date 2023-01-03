import Page from "../../components/page/page";
import DefaultSettings from "../../components/default-settings/default-settings";
import PluginsConfig from "../../components/plugins-config/plugins-config";
import useDownloadProfile from "../../hooks/use-download-profile";
import classNames from "classnames";

export default function Home() {
  const download = useDownloadProfile();

  return (
    <Page>
      <DefaultSettings />
      <PluginsConfig />
      <div className={classNames("flex", "justify-end")}>
        <button
          className={classNames(
            "relative",
            "flex",
            "items-center",
            "outline-none",
            "border-none",
            "rounded",
            "text-4xl",
            "justify-center",
            "py-4",
            "px-8",
            "my-8",
            "bold-font:font-bold",
            "theme-light:bg-neutral-300",
            "theme-light:text-black",
            "theme-dark:bg-neutral-700",
            "theme-dark:text-white",
            "hover:theme-light:bg-neutral-200",
            "hover:theme-dark:bg-neutral-800"
          )}
          onClick={download}
        >
          Download Profile
        </button>
      </div>
    </Page>
  );
}
