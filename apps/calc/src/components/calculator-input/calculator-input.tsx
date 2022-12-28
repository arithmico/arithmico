import classNames from "classnames";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalculatorRootState } from "@stores/calculator-store";
import useEvaluate from "../../hooks/use-evaluate";
import { useTranslation } from "react-i18next";
import {
  moveBackInHistory,
  moveForwardInHistory,
  setInput,
} from "@stores/slices/calculator-session";

interface CalculatorInputProps {
  onEnterPressed: () => void;
}

const CalculatorInput = forwardRef<HTMLInputElement, CalculatorInputProps>(
  ({ onEnterPressed }, ref) => {
    const dispatch = useDispatch();
    const evaluate = useEvaluate();
    const [t] = useTranslation();
    const input = useSelector(
      (state: CalculatorRootState) => state.session.input
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        dispatch(moveBackInHistory());
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        dispatch(moveForwardInHistory());
        e.preventDefault();
      }
    };

    const onInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && input.length > 0) {
        evaluate();
        onEnterPressed();
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        className={classNames(
          "w-full",
          "text-4xl",
          "outline-none",
          "border",
          "px-4",
          "py-6",
          "rounded-md",
          "bold-font:font-bold",
          "theme-light:border-neutral-400",
          "theme-light:focus:border-neutral-600",
          "theme-light:bg-neutral-100",
          "theme-dark:bg-neutral-800",
          "theme-dark:border-neutral-500",
          "theme-dark:focus:border-neutral-100"
        )}
        placeholder={t("common.input")}
        value={input}
        onChange={(e) => dispatch(setInput(e.target.value))}
        onKeyPress={onInputKeyPress}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    );
  }
);

export default CalculatorInput;
