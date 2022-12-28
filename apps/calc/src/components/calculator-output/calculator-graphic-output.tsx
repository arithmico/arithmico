import { GraphicResult } from "@arithmico/engine/lib/types";
import { forwardRef } from "react";

interface CalculatorGraphicOutputProps {
  onEnterPressed: () => void;
  output: GraphicResult;
}

const GraphicOutput = forwardRef<HTMLDivElement, CalculatorGraphicOutputProps>(
  ({ onEnterPressed }, ref) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onEnterPressed();
      }
    };

    return (
      <div ref={ref} onKeyDown={onKeyDown}>
        graphic output
      </div>
    );
  }
);

export default GraphicOutput;
