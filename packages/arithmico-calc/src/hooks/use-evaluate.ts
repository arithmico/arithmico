import { getDefaultContext } from "@arithmico/engine";
import { CalculatorRootState } from "@stores/calculator-store";
import { evaluate } from "../store/slices/session.slice";
import { useDispatch, useSelector } from "react-redux";
import useNumberFormat from "./use-number-format";

const defaultContext = getDefaultContext();

export default function useEvaluate() {
  const dispatch = useDispatch();
  const stack = useSelector(
    (state: CalculatorRootState) => state.session.stack
  );
  const angleUnit = useSelector(
    (state: CalculatorRootState) => state.settings.angleUnit
  );
  const decimalPlaces = useSelector(
    (state: CalculatorRootState) => state.settings.decimalPlaces
  );
  const numberFormat = useNumberFormat();

  return () =>
    dispatch(
      evaluate({
        options: {
          angleUnit: angleUnit === "degrees" ? angleUnit : "radians",
          decimalPlaces,
          decimalSeparator: numberFormat === "de" ? "," : ".",
          magnitudeThresholdForScientificNotation: decimalPlaces,
          operators: defaultContext.options.operators,
        },
        methods: defaultContext.methods,
        stack,
      })
    );
}
