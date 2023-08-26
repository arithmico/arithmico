import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalculatorRootState } from "../../store/store";
import useEvaluate from "../../hooks/use-evaluate";
import { useTranslation } from "react-i18next";
import {
  moveBackInHistory,
  moveForwardInHistory,
  setInput,
} from "../../store/slices/session.slice";
import { ResponsiveTextInput } from "../responsive-text-input/responsive-text-input";

interface CalculatorInputProps {
  onEnterPressed: () => void;
}

const CalculatorInput = forwardRef<
  HTMLInputElement,
  HTMLProps<HTMLInputElement> & CalculatorInputProps
>(({ onEnterPressed, className }, ref) => {
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
    } else if (e.key === "Enter" && input.length > 0) {
      evaluate();
      onEnterPressed();
    }
  };

  return (
    <ResponsiveTextInput
      ref={ref}
      type="text"
      autoCapitalize="off"
      inputMode="url"
      className={classNames(
        "pr-14",
          "focus:outline",
          "focus:outline-4",
        "theme-light:border-neutral-400",
        "theme-light:bg-neutral-100",
          "theme-light:focus:outline-black/70",
          "theme-dark:bg-neutral-800",
        "theme-dark:border-neutral-500",
        "theme-dark:focus:outline-white/70",
        className
      )}
      placeholder={t("common.input")}
      value={input}
      onChange={(e) => dispatch(setInput(e.currentTarget.value))}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  );
});

export default CalculatorInput;
