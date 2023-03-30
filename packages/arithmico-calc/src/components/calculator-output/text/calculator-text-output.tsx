import { TextResult } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

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
    <input
      type="text"
      className={classNames(
        "mt-4",
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
        "rounded-md",
        "bold-font:font-bold",
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
