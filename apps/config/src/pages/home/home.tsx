import DefaultSettings from "../../components/default-settings/default-settings";
import PluginsConfig from "../../components/plugins-config/plugins-config";
import useDownloadProfile from "../../hooks/use-download-profile";
import classNames from "classnames";
import PageContainer from "../../components/page-container/page-container";
import WithScrollbars from "../../components/with-scrollbars/with-scrollbars";

export default function Home() {
  const download = useDownloadProfile();

  return (
    <WithScrollbars>
      <PageContainer className={classNames("flex", "flex-col")}>
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
              "text-lg",
              "justify-center",
              "py-2",
              "px-4",
              "my-8",
              "bold-font:font-bold",
              "bg-neutral-300",
              "text-black",
              "hover:bg-neutral-200"
            )}
            onClick={download}
          >
            Download Profile
          </button>
        </div>
      </PageContainer>
    </WithScrollbars>
  );
}
