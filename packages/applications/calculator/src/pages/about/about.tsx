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
  homepage: string;
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
  const classNamesOutline = classNames(
    "ui-focus-visible:outline",
    "outline-2",
    "outline-offset-2",
    "theme-light:outline-black",
    "theme-dark:outline-white",
  );

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
            "pl-8",
          )}
        >
          <DD>{t("about.version")}</DD>
          <DT>{version}</DT>
          <DD>{t("about.sourceCode")}</DD>
          <DT>
            <a
              href={packageJson.homepage}
              className={classNames(classNamesOutline)}
            >
              {packageJson.homepage}
            </a>
          </DT>
          <DD>{t("about.website")}</DD>
          <DT>
            <a
              href="https://blog.arithmico.com"
              className={classNames(classNamesOutline)}
            >
              Arithmico Blog
            </a>
          </DT>
          <DD>{t("about.contact")}</DD>
          <DT>
            <a
              href="mailto:dev.behrenle@posteo.de"
              className={classNames(classNamesOutline)}
            >
              dev.behrenle@posteo.de
            </a>
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
            <a
              href="https://cdn.arithmico.com/Arithmico_2.0_Anleitung_LaTeX-Version.docx"
              className={classNames(classNamesOutline)}
            >
              {t("about.documentation")}
            </a>
          </li>
          <li>
            <a
              href="https://blog.arithmico.com/downloads"
              className={classNames(classNamesOutline)}
            >
              {t("about.offlineVersion")}
            </a>
          </li>
          <li>
            <Link
              to="/terms-of-service"
              className={classNames(classNamesOutline)}
            >
              {t("about.terms-of-service")}
            </Link>
          </li>
          <li>
            <Link
              to="/privacy-policy"
              className={classNames(classNamesOutline)}
            >
              {t("about.privacy-policy")}
            </Link>
          </li>
          <li>
            <Link to="/imprint" className={classNames(classNamesOutline)}>
              {t("about.imprint")}
            </Link>
          </li>
        </ul>
      </PageContainer>
    </WithScrollbars>
  );
}
