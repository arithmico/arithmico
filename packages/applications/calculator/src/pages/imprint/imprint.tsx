import { ImprintContent } from "ui-components";
import classNames from "classnames";
import PageContainer from "../../components/page-container/page-container";
import WithScrollbars from "../../components/with-scrollbars/with-scrollbars";
import React from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../hooks/use-title";

export default function Imprint() {
  const [t] = useTranslation();
  useTitle(t("about.imprint").concat(" - Arithmico"));

  return (
    <WithScrollbars>
      <PageContainer
        className={classNames(
          "text-xl",
          "[&_h1]:text-3xl",
          "[&_h1]:mb-4",
          "[&_h1]:font-bold",
          "[&_h2]:font-bold",
          "[&_h3]:font-bold",
          "[&_h2]:mt-4",
          "[&_h2]:mb-2",
          "[&_h2]:text-2xl",
          "[&_h3]:mt-4",
          "[&_h3]:mb-2",
          "[&_h3]:text-xl",
          "[&_a]:underline",
          "bold-font:font-bold",
        )}
      >
        <ImprintContent />
      </PageContainer>
    </WithScrollbars>
  );
}
