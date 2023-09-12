import { resetAll, resetDefinitions } from "../../store/slices/session.slice";
import classNames from "classnames";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHotkey from "../../hooks/use-hotkey";
import { CalculatorRootState } from "../../store/store";

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
      "bold-font:font-bold",
      "border",
      "md:p-4",
      "p-2",
      "rounded-sm",
      "text-left",
      "ui-focus-visible:outline",
      "outline-2",
      "outline-offset-2",
      "theme-light:outline-black",
      "theme-dark:outline-white",
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
    (state: CalculatorRootState) => state.session.output,
  );
  const currentInput = useSelector(
    (state: CalculatorRootState) => state.session.input,
  );
  const [t] = useTranslation();
  useHotkey("ctrl + alt + m", () => dispatch(resetDefinitions()));
  useHotkey("ctrl + alt + a", () => dispatch(resetAll()));
  useHotkey("alt + p", () => {
    let text = currentInput + "\n";
    if (currentOutput.type === "text") {
      text += currentOutput.text;
    } else if (currentOutput.type === "error") {
      text += currentOutput.error;
    } else {
      text += "non serializeable output";
    }
    navigator.clipboard.writeText(text);
  });

  return (
    <div
      className={classNames("grid", "grid-cols-1", "sm:grid-cols-3", "gap-2")}
    >
      <CalculatorToolbarButton onClick={() => navigate("/definitions")}>
        {t("toolbar.definitions")}
      </CalculatorToolbarButton>

      <CalculatorToolbarButton onClick={() => navigate("/history")}>
        {t("toolbar.history")}
      </CalculatorToolbarButton>

      <CalculatorToolbarButton onClick={() => dispatch(resetAll())}>
        {t("toolbar.resetAll")}
      </CalculatorToolbarButton>
    </div>
  );
}
