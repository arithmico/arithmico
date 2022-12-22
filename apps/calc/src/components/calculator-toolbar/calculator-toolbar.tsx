import { CalculatorRootState } from "@stores/calculator-store";
import {
  resetAll,
  resetDefinitions,
  resetInput,
  resetOutput,
  resetProtocol,
} from "@stores/slices/calculator-session";
import classNames from "classnames";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useExportProtocol from "../../hooks/use-export-protocol";
import useHotkey from "../../hooks/use-hotkey";

const CalculatorToolbarButton = forwardRef<
  HTMLButtonElement,
  {
    onClick: () => void;
    children: React.ReactNode;
  }
>((props, ref) => (
  <button
    ref={ref}
    className={classNames(
      "theme-dark:bg-neutral-800",
      "theme-dark:hover:bg-neutral-700",
      "theme-dark:border-white/5",
      "theme-light:bg-neutral-200",
      "theme-light:hover:bg-neutral-300",
      "theme-light:border-black/10",
      "border",
      "p-4",
      "rounded-sm",
      "text-left"
    )}
    {...props}
  >
    {props.children}
  </button>
));

export default function CalculatorToolbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOutput = useSelector(
    (state: CalculatorRootState) => state.session.output
  );
  const currentInput = useSelector(
    (state: CalculatorRootState) => state.session.input
  );
  const [t] = useTranslation();
  const exportProtocol = useExportProtocol();

  useHotkey("ctrl + alt + m", () => dispatch(resetDefinitions()));
  useHotkey("ctrl + alt + a", () => dispatch(resetAll()));
  useHotkey("alt + p", () =>
    navigator.clipboard.writeText(currentInput + "\n" + currentOutput)
  );

  return (
    <div
      className={classNames("grid", "grid-rows-2", "gap-2", "grid-flow-col")}
    >
      <CalculatorToolbarButton onClick={() => dispatch(resetInput())}>
        {t("toolbar.resetInput")}
      </CalculatorToolbarButton>
      <CalculatorToolbarButton onClick={() => dispatch(resetOutput)}>
        {t("toolbar.resetOutput")}
      </CalculatorToolbarButton>

      <CalculatorToolbarButton onClick={() => navigate("/definitions")}>
        {t("toolbar.showDefinitions")}
      </CalculatorToolbarButton>
      <CalculatorToolbarButton onClick={() => dispatch(resetDefinitions())}>
        {t("toolbar.resetDefinitions")}
      </CalculatorToolbarButton>

      <CalculatorToolbarButton onClick={() => navigate("/protocol")}>
        {t("toolbar.showProtocol")}
      </CalculatorToolbarButton>
      <CalculatorToolbarButton onClick={() => dispatch(resetProtocol())}>
        {t("toolbar.resetProtocol")}
      </CalculatorToolbarButton>

      <CalculatorToolbarButton onClick={exportProtocol}>
        {t("toolbar.exportProtocol")}
      </CalculatorToolbarButton>
      <CalculatorToolbarButton onClick={() => dispatch(resetAll())}>
        {t("toolbar.resetAll")}
      </CalculatorToolbarButton>
    </div>
  );
}
