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
        "pr-14",
        "theme-dark:bg-red-900",
        "theme-dark:border-red-500",
        "theme-light:border-red-300",
        "theme-light:text-red-700",
        "theme-light:bg-red-100",
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
