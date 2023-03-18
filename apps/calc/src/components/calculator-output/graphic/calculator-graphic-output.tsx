import { GraphicResult } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import { forwardRef } from "react";
import GraphicDynamicSizeHandler from "../../graphic-renderer/size-handlers/graphic-dynamic-size-handler";
import GraphicOutputToolbar from "./graphic-output-toolbar";

interface CalculatorGraphicOutputProps {
  onEnterPressed: () => void;
  output: GraphicResult & { input: string };
}

const GraphicOutput = forwardRef<HTMLDivElement, CalculatorGraphicOutputProps>(
  ({ onEnterPressed, output }, ref) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onEnterPressed();
      }
    };

    return (
      <div
        tabIndex={0}
        ref={ref}
        onKeyDown={onKeyDown}
        className={classNames(
          "mt-4",
          "border",
          "h-full",
          "rounded-md",
          "max-h-full",
          "max-w-full",
          "grid",
          "grid-cols-[7fr_1fr]",
          "overflow-hidden",
          "outline-none",
          "theme-dark:border-neutral-500",
          "theme-dark:focus:border-neutral-100",
          "theme-dark:bg-neutral-800",
          "theme-light:border-neutral-400",
          "theme-light:focus:border-neutral-600",
          "theme-light:bg-neutral-100"
        )}
      >
        <GraphicDynamicSizeHandler graphic={output.graphic} />
        <GraphicOutputToolbar graphic={output.graphic} input={output.input} />
      </div>
    );
  }
);

export default GraphicOutput;
