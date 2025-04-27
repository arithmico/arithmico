import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageContainer from "../../components/page-container/page-container";
import useTitle from "../../hooks/use-title";

export default function NewVersionAvailable() {
  const [t] = useTranslation();
  const [latestVersion, setLatestVersion] = useState("{{version}}");

  useEffect(() => {
    fetch("https://cdn.arithmico.com/meta/latest_version.txt")
      .then((res) => res.text())
      .then((text) => {
        setLatestVersion(text.trim());
      });
  }, [setLatestVersion]);

  useTitle(t("title.new-version-available"));

  return (
    <PageContainer className={classNames("flex, flex-col")}>
      <h1 className={classNames("text-3xl", "font-medium", "mb-4")}>
        {t("new-version-available.title")}
      </h1>
      <p>
        <Trans i18nKey={"new-version-available.text"}>
          {{
            version: latestVersion,
          }}
          <a
            className={classNames("font-bold")}
            href={`https://blob.arithmico.com/calculator/offline/${latestVersion}.zip`}
          >
            here
          </a>
        </Trans>
      </p>
      <div className={classNames("mt-4")}>
        <Link className={classNames("border", "px-4", "py-2")} to="/">
          {t("new-version-available.back")}
        </Link>
      </div>
    </PageContainer>
  );
}
