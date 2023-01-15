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
              "[&>li]:border-b",
              "[&>li:last]:border-b-0",
              "[&>li]:theme-dark:border-white/5",
              "[&>li]:theme-light:border-black/10",
              "2xl:max-w-[60vw]",
              "lg:max-w-[calc(100vw-6rem)]",
              "max-w-[calc(100vw-2rem)]",
              "[&>li]:grid",
              "[&>li]:gap-4",
              "[&>li]:p-4",
              "[&>li]:break-words",
              "[&>li]:break-all",
              "[&>li]:grid-cols-[1fr_auto_1fr]",
              "text-2xl"
            )}
          >
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
