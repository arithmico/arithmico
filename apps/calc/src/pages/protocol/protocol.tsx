import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageContainer from "@local-components/page-container/page-container";
import ProtocolMathItem from "@local-components/protocol-math-item/protocol-math-item";
import { useSelector } from "react-redux";
import { CalculatorRootState } from "@stores/calculator-store";
import ProtocolInfoItem from "@local-components/protocol-info-item/info-protocol-item";
import ProtocolErrorItem from "@local-components/protocol-error-item/protocol-error-item";
import WithScrollbars from "../../components/with-scrollbars/with-scrollbars";
import classNames from "classnames";

export default function Protocol() {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const protocolItems = useSelector(
    (state: CalculatorRootState) => state.session.protocol
  );

  return (
    <PageContainer className={classNames("flex", "flex-col")}>
      <div
        className={classNames(
          "grid",
          "grid-rows-[auto_1fr]",
          "theme-dark:bg-neutral-850",
          "border",
          "theme-dark:border-white/5",
          "rounded-md",
          "h-full"
        )}
      >
        <div
          className={classNames(
            "flex",
            "theme-dark:bg-neutral-800",
            "rounded-md",
            "items-center",
            "ring-1",
            "ring-white/5"
          )}
        >
          <h1 className={classNames("text-3xl", "px-4")}>{t("protocol")}</h1>
          <button
            className={classNames(
              "ml-auto",
              "p-6",
              "theme-dark:hover:bg-neutral-700",
              "rounded-md"
            )}
            onClick={() => navigate("/")}
          >
            {t("common.back")}
          </button>
        </div>
        <WithScrollbars>
          <ul>
            {protocolItems.map((item, index) => {
              switch (item.type) {
                case "math":
                  return (
                    <ProtocolMathItem
                      input={item.input}
                      output={item.output}
                      key={index}
                    />
                  );

                case "info":
                  return <ProtocolInfoItem message={item.info} key={index} />;

                case "error":
                  return (
                    <ProtocolErrorItem
                      input={item.input}
                      output={item.error}
                      key={index}
                    />
                  );
                default:
                  return null;
              }
            })}
          </ul>
        </WithScrollbars>
      </div>
    </PageContainer>
  );
}
