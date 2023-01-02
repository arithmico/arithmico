import Page from "../../components/page/page";
import DefaultSettings from "../../components/default-settings/default-settings";
import PluginsConfig from "../../components/plugins-config/plugins-config";
import styled from "styled-components";
import useDownloadProfile from "../../hooks/use-download-profile";
import classNames from "classnames";

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--me-background-300);
  outline: none;
  border: none;
  border-radius: 0.25rem;
  font-size: 2rem;
  color: var(--me-text-400);
  justify-content: center;
  padding: 1rem 2rem;
  font-weight: var(--me-font-weight-normal);
  margin: 2rem 0;

  &:hover {
    background-color: var(--me-background-400);
  }
`;

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
            "theme-light:bg-neutral-300",
            "theme-dark:bg-neutral-700",
            "outline-none",
            "border-none",
            "rounded",
            "text-4xl",
            "theme-light:text-black",
            "theme-dark:text-white",
            "justify-center",
            "py-4",
            "px-8",
            "my-8",
            "bold-font:font-bold",
            "theme-light:text-black",
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
