import { CalculatorRootState } from "@stores/calculator-store";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useDownloadText from "./use-download-text";

export default function useExportProtocol() {
  const protocol = useSelector(
    (state: CalculatorRootState) => state.session.protocol
  );
  const save = useDownloadText();
  const [t] = useTranslation();
  return () => {
    save(
      protocol
        .map((item) => {
          switch (item.type) {
            case "math":
              return `${t("common.input")}: ${item.input}\n${t(
                "common.output"
              )}: ${item.output}`;

            case "info":
              return `INFO: ${item.info}`;

            case "error":
              return `${t("common.input")}: ${item.input}\n${t(
                "common.output"
              )}: ${item.error}`;
            default:
              return "";
          }
        })
        .join("\n\n"),
      `${t("protocol")}.txt`
    );
  };
}
