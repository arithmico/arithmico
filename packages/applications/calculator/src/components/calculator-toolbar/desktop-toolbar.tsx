import { resetAll } from "../../store/slices/session.slice";
import classNames from "classnames";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

export default function DesktopToolbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t] = useTranslation();

  return (
    <div
      className={classNames(
        "hidden",
        "md:grid",
        "grid-cols-1",
        "grid-cols-3",
        "gap-2",
      )}
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
