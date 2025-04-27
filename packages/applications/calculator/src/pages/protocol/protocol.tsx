import PageContainer from "@local-components/page-container/page-container";
import { useSelector } from "react-redux";
import WithScrollbars from "../../components/with-scrollbars/with-scrollbars";
import classNames from "classnames";
import ProtocolListItem from "../../components/protocol-list-item/protocol-list-item";
import { CalculatorRootState } from "../../store/store";
import { ProtocolHeader } from "./components/protocol-header";
import React from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../hooks/use-title";

export default function Protocol() {
  const protocolItems = useSelector(
    (state: CalculatorRootState) => state.session.protocol,
  );
  const [t] = useTranslation();
  useTitle(t("title.history"));

  return (
    <PageContainer>
      <div
        className={classNames(
          "flex",
          "flex-col",
          "theme-dark:bg-neutral-850",
          "theme-light:bg-neutral-100",
          "border",
          "theme-dark:border-white/5",
          "theme-light:border-black/10",
          "rounded-md",
          "h-full",
        )}
      >
        <ProtocolHeader />
        <WithScrollbars>
          <ul
            className={classNames(
              "grid",
              "grid-cols-1",
              "2xl:max-w-[60vw]",
              "lg:max-w-[calc(100vw-6rem)]",
              "max-w-[calc(100vw-2rem)]",
              "text-2xl",
            )}
          >
            {protocolItems.map((item, index) => (
              <ProtocolListItem item={item} key={index} />
            ))}
          </ul>
        </WithScrollbars>
      </div>
    </PageContainer>
  );
}
