import { useEffect, useState } from "react";
import packageJsonData from "@workspace-package.json";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const currentVersion = packageJsonData["version"];

export default function useNotifyNewVersion() {
  const [notify, setNotify] = useState(false);
  const navigate = useNavigate();

  /*useEffect(() => {
    fetch("https://cdn.arithmico.com/meta/latest_version.txt")
      .then((res) => res.text())
      .then((text) => {
        const latestVersion = text.trim();
        if (latestVersion !== currentVersion) {
          if (!localStorage.getItem(`notify-version-${latestVersion}`)) {
            setNotify(true);
            localStorage.setItem(`notify-version-${latestVersion}`, "true");
          }
        }
      });
  }, [setNotify]);*/

  useEffect(() => {
    if (notify) {
      setNotify(false);
      navigate("/new-version-available");
    }
  }, [notify, navigate]);
}
