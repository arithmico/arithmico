import {forwardRef, RefObject} from "react";
import {useSelector} from "react-redux";
import {CalculatorRootState} from "@stores/calculator-store";
import CalculatorErrorOutput from "./error/calculator-error-output";
import CalculatorTextOutput from "./text/calculator-text-output";
import GraphicOutput from "./graphic/calculator-graphic-output";

interface CalculatorOutputProps {
  onEnterPressed: () => void;
}

const CalculatorOutput = forwardRef<HTMLElement, CalculatorOutputProps>(
  ({ onEnterPressed }, ref) => {
    const output = useSelector(
      (state: CalculatorRootState) => state.session.output
    );

    switch (output.type) {
      case "text":
        return (
          <CalculatorTextOutput
            ref={ref as RefObject<HTMLInputElement>}
            onEnterPressed={onEnterPressed}
            output={output}
          />
        );

      case "error":
        return (
          <CalculatorErrorOutput
            ref={ref as RefObject<HTMLInputElement>}
            onEnterPressed={onEnterPressed}
            output={output}
          />
        );

      case "graphic":
        return (
          <GraphicOutput
            ref={ref as RefObject<HTMLDivElement>}
            onEnterPressed={onEnterPressed}
            output={output}
          />
        );
    }

    return <div>unknown output type</div>;
  }
);

export default CalculatorOutput;
