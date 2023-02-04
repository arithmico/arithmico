import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageContainer from "@local-components/page-container/page-container";
import { useSelector } from "react-redux";
import { CalculatorRootState } from "@stores/calculator-store";
import WithScrollbars from "../../components/with-scrollbars/with-scrollbars";
import classNames from "classnames";
import ProtocolListItem from "../../components/protocol-list-item/protocol-list-item";

export default function Protocol() {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const protocolItems = useSelector(
    (state: CalculatorRootState) => state.session.protocol
  );

  console.log(protocolItems);

  return (
    <PageContainer className={classNames("grid")}>
      <div
        className={classNames(
          "grid",
          "grid-rows-[auto_1fr]",
          "theme-dark:bg-neutral-850",
          "theme-light:bg-neutral-100",
          "border",
          "theme-dark:border-white/5",
          "theme-light:border-black/10",
          "rounded-md",
          "h-full"
        )}
      >
        <div
          className={classNames(
            "flex",
            "theme-dark:bg-neutral-800",
            "theme-light:bg-neutral-200",
            "rounded-md",
            "items-center",
            "ring-1",
            "theme-dark:ring-white/5",
            "theme-light:ring-black/10"
          )}
        >
          <h1 className={classNames("text-3xl", "px-4")}>{t("protocol")}</h1>
          <button
            className={classNames(
              "ml-auto",
              "p-6",
              "theme-dark:hover:bg-neutral-700",
              "theme-light:hover:bg-neutral-300",
              "rounded-md"
            )}
            onClick={() => navigate("/")}
          >
            {t("common.back")}
          </button>
        </div>
        <WithScrollbars>
          <ul
            className={classNames(
              "grid",
              "grid-cols-1",
              "2xl:max-w-[60vw]",
              "lg:max-w-[calc(100vw-6rem)]",
              "max-w-[calc(100vw-2rem)]",
              "text-2xl"
            )}
          >
            {protocolItems.map((item) => (
              <ProtocolListItem item={item} />
            ))}
          </ul>
        </WithScrollbars>
      </div>
    </PageContainer>
  );
}
