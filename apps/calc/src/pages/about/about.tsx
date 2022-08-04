import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import packageJsonData from "@workspace-package.json";
import AboutContact from "@local-components/about-contact/about-contact";
import ExternalLink from "@local-components/external-link/external-link";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";

const version: string = process.env.REACT_APP_DEV_MODE
  ? "dev"
  : packageJsonData["version"];

interface PackageInformation {
  version: string;
  license: string;
  author: {
    name: string;
    email: string;
    url: string;
  };
  contributors: {
    name: string;
    email?: string;
  }[];
  bugs: {
    url: string;
  };
}

const packageJson = packageJsonData as PackageInformation;

const Container = styled(PageContainer)`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    font-size: 2.5rem;
    font-weight: var(--me-font-weight-normal);
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  & ul,
  p {
    margin: 0;
  }

  & li {
    margin-bottom: 1rem;
  }
`;

const StyledDl = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  & > dd {
    font-size: 1.5rem;
    text-align: right;
  }

  & > dt {
    grid-column-start: 2;
    font-weight: var(--me-font-weight-normal);
    font-size: 1.5rem;
  }
`;

const StyledLink = styled(Link)`
  color: var(--me-text-400);
  font-weight: var(--me-font-weight-normal);
`;

const StyledExternalLink = styled(ExternalLink)`
  color: var(--me-text-400);
  opacity: 1;
  text-decoration: underline;
  font-weight: var(--me-font-weight-normal);
`;

export default function About() {
  const [t] = useTranslation();
  console.log(packageJson);

  return (
    <WithScrollbars>
      <Container>
        <h1>{t("about.general")}</h1>
        <StyledDl>
          <dd>{t("about.version")}</dd>
          <dt>{version}</dt>
          <dd>{t("about.license")}</dd>
          <dt>{packageJson.license}</dt>

          <dd>{t("about.author")}</dd>
          <dt>
            <AboutContact
              name={packageJson.author.name}
              email={packageJson.author.email}
              url={packageJson.author.url}
            />
          </dt>

          <dd>{t("about.contributors")}</dd>
          {packageJson.contributors.map((contributor) => (
            <dt key={contributor.name}>
              <AboutContact
                name={contributor.name || "n. a."}
                email={
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  contributor?.email || ""
                }
              />
            </dt>
          ))}

          <dd>{t("about.reportBugs")}</dd>
          <dt>
            <ExternalLink href={packageJson.bugs.url}>
              {packageJson.bugs.url}
            </ExternalLink>
          </dt>
        </StyledDl>
        <h1>{t("about.furtherInformation")}</h1>
        <ul>
          <li>
            <StyledExternalLink href="https://blob.behrenle.io/me/MathExplorerAnleitung.docx">
              {t("about.documentation")}
            </StyledExternalLink>
          </li>
          <li>
            <StyledExternalLink href="https://github.com/behrenle/arithmico-calculator/releases">
              {t("about.offlineVersion")}
            </StyledExternalLink>
          </li>
          <li>
            <StyledLink to="/terms-of-service">Terms of Service</StyledLink>
          </li>
          <li>
            <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>
          </li>
          <li>
            <StyledLink to="/imprint">Imprint</StyledLink>
          </li>
        </ul>
      </Container>
    </WithScrollbars>
  );
}
