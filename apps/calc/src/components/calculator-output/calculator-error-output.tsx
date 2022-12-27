import { ErrorResult } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface CalculatorErrorOutputProps {
  output: ErrorResult;
  onEnterPressed: () => void;
}

const CalculatorErrorOutput = forwardRef<
  HTMLInputElement,
  CalculatorErrorOutputProps
>(({ output, onEnterPressed }, ref) => {
  const [t] = useTranslation();

  const onOutputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnterPressed();
    }
  };

  return (
    <input
      type="text"
      className={classNames(
        "mt-4",
        "w-full",
        "text-4xl",
        "outline-none",
        "border",
        "px-4",
        "py-6",
        "rounded-md",
        "bold-font:font-bold",
        "theme-dark:bg-red-900",
        "theme-dark:border-red-500",
        "theme-dark:focus:border-red-400",
        "theme-light:border-red-300",
        "theme-light:focus:border-red-600",
        "theme-light:text-red-700",
        "theme-light:bg-red-100"
      )}
      ref={ref}
      placeholder={t("common.output")}
      readOnly
      value={output.error}
      onKeyPress={onOutputKeyPress}
    />
  );
});

export default CalculatorErrorOutput;
