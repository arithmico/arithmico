import classNames from "classnames";
import { GraphicResult } from "engine/lib/types";
import { forwardRef, useEffect, useState } from "react";
import { CalculatorGraphicDialog } from "./calculator-graphic-dialog";

interface CalculatorGraphicOutputProps {
  onEnterPressed: () => void;
  output: GraphicResult & { input: string };
}

const GraphicOutput = forwardRef<HTMLDivElement, CalculatorGraphicOutputProps>(
  ({ onEnterPressed, output }, ref) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
      setIsOpen(true);
    }, [output]);

    return (
      <div ref={ref}>
        <CalculatorGraphicDialog
          output={output}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
        <button
          className={classNames(
            "w-full",
            "text-xl",
            "sm:text-2xl",
            "md:text-3xl",
            "lg:text-4xl",
            "outline-none",
            "border",
            "px-4",
            "py-2",
            "sm:py-3",
            "md:py-4",
            "lg:py-6",
            "rounded-sm",
            "bold-font:font-bold",
            "theme-light:border-neutral-400",
            "theme-light:focus:border-neutral-600",
            "theme-light:bg-neutral-100",
            "theme-dark:bg-neutral-800",
            "theme-dark:border-neutral-500",
            "theme-dark:focus:border-neutral-100"
          )}
          onClick={() => setIsOpen(true)}
        >
          Grafik anzeigen
        </button>
      </div>
    );
  }
);

export default GraphicOutput;
