import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { CalculatorRootState } from "@stores/calculator-store";
import CalculatorErrorOutput from "./calculator-error-output";
import CalculatorTextOutput from "./calculator-text-output";

interface CalculatorOutputProps {
  onEnterPressed: () => void;
}

const CalculatorOutput = forwardRef<HTMLInputElement, CalculatorOutputProps>(
  ({ onEnterPressed }, ref) => {
    const output = useSelector(
      (state: CalculatorRootState) => state.session.output
    );

    switch (output.type) {
      case "text":
        return (
          <CalculatorTextOutput
            ref={ref}
            onEnterPressed={onEnterPressed}
            output={output}
          />
        );

      case "error":
        return (
          <CalculatorErrorOutput
            ref={ref}
            onEnterPressed={onEnterPressed}
            output={output}
          />
        );
    }

    return <div>unknown output type</div>;
  }
);

export default CalculatorOutput;
