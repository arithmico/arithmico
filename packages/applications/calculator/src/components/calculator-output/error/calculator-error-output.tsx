import { ErrorResult } from "engine/lib/types";
import classNames from "classnames";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveTextInput } from "../../responsive-text-input/responsive-text-input";

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
    <ResponsiveTextInput
      className={classNames(
        "peer",
        "pr-14",
          "focus:outline",
          "focus:outline-4",
        "theme-dark:bg-red-900",
        "theme-dark:border-red-500",
        "theme-dark:focus:outline-red-400",
        "theme-light:border-red-300",
        "theme-light:focus:outline-red-600",
        "theme-light:text-red-700",
        "theme-light:bg-red-100"
      )}
      ref={ref}
      placeholder={t("common.output")}
      readOnly
      value={output.error}
      onKeyDown={onOutputKeyPress}
    />
  );
});

export default CalculatorErrorOutput;
