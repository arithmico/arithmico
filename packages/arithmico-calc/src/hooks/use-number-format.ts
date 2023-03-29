import { CalculatorRootState } from "@stores/calculator-store";
import { useSelector } from "react-redux";

export default function useNumberFormat() {
  const numberFormat = useSelector(
    (state: CalculatorRootState) => state.settings.numberFormat
  );
  const language = useSelector(
    (state: CalculatorRootState) => state.settings.language
  );

  if (numberFormat !== "default") {
    return numberFormat;
  }

  return language;
}
