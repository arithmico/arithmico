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
>(({ onEnterPressed }, ref) => {
  const dispatch = useDispatch();
  const evaluate = useEvaluate();
  const [t] = useTranslation();
  const input = useSelector(
    (state: CalculatorRootState) => state.session.input,
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
      autoComplete="off"
      inputMode="url"
      className={classNames(
        "pr-14",
        "rounded-sm",
        "theme-light:focus-visible:outline-black",
        "theme-dark:focus-visible:outline-white",
      )}
      placeholder={t("common.input") ?? undefined}
      value={input}
      onChange={(e) => dispatch(setInput(e.currentTarget.value))}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  );
});

export default CalculatorInput;
