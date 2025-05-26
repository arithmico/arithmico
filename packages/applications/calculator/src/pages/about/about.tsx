import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import packageJsonData from "@workspace-package.json";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import classNames from "classnames";
import useTitle from "../../hooks/use-title";

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

  useTitle(t("title.about"));

  const teamMembers = [
    "Tizian Roth",
    "Knut Büttner",
    "Ulrich Kalina",
    "Mirko Melz",
    "Maike Castorph",
    "Prof. Dr. habil. Ilka Agricola",
    "Dr. Kai Kortus",
  ];

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
          <DD>{t("about.contributors")}</DD>
          <DT>
            <a
              href="https://github.com/arithmico/arithmico/contributors"
              className={classNames(classNamesOutline)}
            >
              https://github.com/arithmico/arithmico/contributors
            </a>
          </DT>
        </dl>

        <h2 className={classNames("text-3xl", "mt-16", "mb-4")}>
          {t("about.aboutArithmico")}
        </h2>
        <p className="lg:w-3/4 text-xl">
          {t("about.aboutArithmico.description1")}
        </p>
        <p className="lg:w-3/4 text-xl mt-3">
          <Trans i18nKey={"about.aboutArithmico.description2"}>
            {{}}
            <a
              href="https://www.blista.de/"
              className={classNames(classNamesOutline, "underline")}
            >
              blista.de
            </a>
            <a
              href="https://www.math4vip.de/"
              className={classNames(classNamesOutline, "underline")}
            >
              math4vip.de
            </a>
          </Trans>
        </p>

        <h2 className={classNames("text-3xl", "mt-16", "mb-4")}>
          {t("about.contact")}
        </h2>
        <p className="lg:w-3/4 text-xl">
          <Trans i18nKey={"about.contact.description"}>
            {{
              email: "arithmico@blista.de",
            }}
            <a
              href="mailto:arithmico@blista.de"
              className={classNames(classNamesOutline, "underline")}
            >
              arithmico@blista.de
            </a>
          </Trans>
        </p>

        <h2 className={classNames("text-3xl", "mt-16", "mb-4")}>
          {t("about.offline-versions")}
        </h2>
        <p className="lg:w-3/4 text-xl">
          <Trans i18nKey={"about.offline-versions.description"}>
            {{}}
            <a
              href="https://blog.arithmico.com/downloads"
              className={classNames(classNamesOutline, "underline")}
            >
              downloads
            </a>
          </Trans>
        </p>

        <h2 className={classNames("text-3xl", "mt-16", "mb-4")}>
          {t("about.donationAppeal")}
        </h2>
        <p className="lg:w-3/4 text-xl">
          {t("about.donationAppeal.description")}
        </p>
        <div className="lg:w-3/4 flex items-center justify-center border-2 p-2 my-2 rounded-md theme-light:border-black theme-dark:border-white">
          <dl className="text-xl grid grid-cols-[auto_1fr] gap-x-4">
            <dt className="text-right font-bold">
              {t("about.donationAppeal.iban")}
            </dt>
            <dd>DE50 5005 0000 0001 0064 44</dd>
            <dt className="text-right font-bold">
              {t("about.donationAppeal.bic")}
            </dt>
            <dd>HELADEFFXXX</dd>
            <dt className="text-right font-bold">
              {t("about.donationAppeal.reference")}
            </dt>
            <dd>Fondsnummer 81203176</dd>
          </dl>
        </div>
        <p className="lg:w-3/4 text-xl mt-3">
          <Trans i18nKey={"about.donationAppeal.outro"}>
            {{
              email: "kontakt@math4vip.de",
            }}
            <a
              href="mailto:kontakt@math4vip.de"
              className={classNames(classNamesOutline, "underline")}
            >
              kontakt@math4vip.de
            </a>
          </Trans>
        </p>

        <h2 className={classNames("text-3xl", "mt-16", "mb-4")}>
          {t("about.team")}
        </h2>
        <ul className={classNames("pl-8 grid grid-cols-2")}>
          {[packageJson.author.name, ...teamMembers].map((name) => (
            <li className={classNames("text-xl", "py-2")}>{name}</li>
          ))}
        </ul>

        <h2 className={classNames("text-3xl", "mt-16", "mb-4")}>
          {t("about.furtherInformation")}
        </h2>
        <ul className={classNames("pl-8", "[&>li]:py-2", "[&>li]:text-xl")}>
          <li>
            <a
              href="https://cdn.arithmico.com/Arithmico_2.24_Anleitung_LaTeX-Version.docx"
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

        <h2 className={classNames("text-3xl", "mt-16", "mb-4")}>
          {t("about.sponsors")}
        </h2>
        <div className="grid grid-cols-2 gap-1">
          <a
            className={classNames(
              "p-4",
              "bg-white",
              "rounded-md",
              classNamesOutline,
            )}
            href="https://blista.de"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">blista Campus</span>
            <img
              aria-hidden
              className="w-full"
              src="blista-logo.svg"
              alt="blista Campus Logo"
            />
          </a>
          <a
            className={classNames(
              "p-4",
              "bg-white",
              "rounded-md",
              classNamesOutline,
            )}
            href="https://math4vip.de"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">Math4VIP</span>
            <img
              aria-hidden
              className="w-full"
              src="math4vip_logo_768x385.png"
              alt="Math4VIP Logo"
            />
          </a>
          <a
            className={classNames(
              "p-4",
              "bg-white",
              "rounded-md",
              classNamesOutline,
            )}
            href="http://www.nikolauspflege.de/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">Nikolauspflege</span>
            <img
              aria-hidden
              className="w-full"
              src="nikolauspflege_logo.png"
              alt="Nikolauspflege Logo"
            />
          </a>
        </div>
      </PageContainer>
    </WithScrollbars>
  );
}
