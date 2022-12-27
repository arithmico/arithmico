import { Output } from "@stores/slices/calculator-session";
import { forwardRef } from "react";
import CalculatorErrorOutput from "./calculator-error-output";
import CalculatorTextOutput from "./calculator-text-output";

interface CalculatorOutputProps {
  output: Output;
  onEnterPressed: () => void;
}

const CalculatorOutput = forwardRef<HTMLInputElement, CalculatorOutputProps>(
  ({ output, onEnterPressed }, ref) => {
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
