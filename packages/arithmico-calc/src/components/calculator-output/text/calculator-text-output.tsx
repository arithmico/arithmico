import { TextResult } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveTextInput } from "../../responsive-text-input/responsive-text-input";

interface CalculatorTextOutputProps {
  output: Omit<TextResult, "context">;
  onEnterPressed: () => void;
}

const CalculatorTextOutput = forwardRef<
  HTMLInputElement,
  CalculatorTextOutputProps
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
        "mt-4",
        "theme-dark:border-neutral-500",
        "theme-dark:focus:border-neutral-100",
        "theme-dark:bg-neutral-800",
        "theme-light:border-neutral-400",
        "theme-light:focus:border-neutral-600",
        "theme-light:bg-neutral-100"
      )}
      ref={ref}
      placeholder={t("common.output")}
      readOnly
      value={output.text}
      onKeyDown={onOutputKeyPress}
    />
  );
});

export default CalculatorTextOutput;
