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
          switch (item.output.type) {
            case "text":
              return `${t("common.input")}: ${item.input}\n${t(
                "common.output"
              )}: ${item.output.text}`;

            case "error":
              return `${t("common.input")}: ${item.input}\n${t(
                "common.output"
              )}: ${item.output.error}`;

            case "graphic":
              return `${t("common.input")}: ${item.input}\n${t(
                "common.output"
              )}: ${"[graphics]"}`;

            default:
              return "";
          }
        })
        .join("\n\n"),
      `${t("protocol")}.txt`
    );
  };
}
