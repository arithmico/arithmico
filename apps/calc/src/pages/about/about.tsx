import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import packageJsonData from "@workspace-package.json";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import classNames from "classnames";

const version: string = import.meta.env.VITE_DEV_MODE
  ? "dev"
  : packageJsonData["version"];

interface PackageInformation {
  version: string;
  license: string;
  author: {
    name: string;
  };
  contributors: {
    name: string;
  }[];
  sourceCode: {
    url: string;
  };
}

const packageJson = packageJsonData as PackageInformation;

interface ChildProps {
  children: React.ReactNode;
}

function DD({ children }: ChildProps) {
  return (
    <dd className={classNames("col-start-1", "text-xl", "py-2")}>{children}</dd>
  );
}

function DT({ children }: ChildProps) {
  return (
    <dt className={classNames("col-start-2", "text-xl", "py-2")}>{children}</dt>
  );
}

export default function About() {
  const [t] = useTranslation();

  return (
    <WithScrollbars>
      <PageContainer className={classNames("bold-font:font-bold")}>
        <h2 className={classNames("text-3xl", "mb-4")}>{t("about.general")}</h2>
        <dl
          className={classNames(
            "grid",
            "grid-cols-[auto_1fr]",
            "gap-x-4",
            "my-4",
            "pl-8"
          )}
        >
          <DD>{t("about.version")}</DD>
          <DT>{version}</DT>
          <DD>{t("about.license")}</DD>
          <DT>{packageJson.license}</DT>
          <DD>{t("about.sourceCode")}</DD>
          <DT>
            <a href={packageJson.sourceCode.url}>{packageJson.bugs.url}</a>
          </DT>
          <DD>{t("about.website")}</DD>
          <DT>
            <a href="https://blog.arithmico.com">Arithmico Blog</a>
          </DT>
          <DD>{t("about.contact")}</DD>
          <DT>
            <a href="mailto:dev.behrenle@posteo.de">team@arithmico.com</a>
          </DT>
        </dl>

        <h2 className={classNames("text-3xl", "mt-16", "mb-4")}>
          {t("about.team")}
        </h2>
        <ul className={classNames("pl-8")}>
          {[
            packageJson.author.name,
            ...packageJson.contributors.map((c) => c.name),
          ].map((name) => (
            <li className={classNames("text-xl", "py-2")}>{name}</li>
          ))}
        </ul>

        <h2 className={classNames("text-3xl", "mt-16", "mb-4")}>
          {t("about.furtherInformation")}
        </h2>
        <ul className={classNames("pl-8", "[&>li]:py-2", "[&>li]:text-xl")}>
          <li>
            <a href="https://blob.arithmico.com/calculator/ArithmicoAnleitung.docx">
              {t("about.documentation")}
            </a>
          </li>
          <li>
            <a href="https://github.com/behrenle/arithmico-calculator/releases">
              {t("about.offlineVersion")}
            </a>
          </li>
          <li>
            <Link to="/terms-of-service">{t("about.terms-of-service")}</Link>
          </li>
          <li>
            <Link to="/privacy-policy">{t("about.privacy-policy")}</Link>
          </li>
          <li>
            <Link to="/imprint">{t("about.imprint")}</Link>
          </li>
        </ul>
      </PageContainer>
    </WithScrollbars>
  );
}
