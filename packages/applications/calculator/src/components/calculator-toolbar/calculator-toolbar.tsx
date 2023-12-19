import { useDispatch, useSelector } from "react-redux";
import { CalculatorRootState } from "../../store/store";
import useHotkey from "../../hooks/use-hotkey";
import { resetAll, resetDefinitions } from "../../store/slices/session.slice";
import DesktopToolbar from "@local-components/calculator-toolbar/desktop-toolbar";
import MobileToolbar from "@local-components/calculator-toolbar/mobile-toolbar";
import classNames from "classnames";

export default function CalculatorToolbar() {
  const dispatch = useDispatch();
  const currentOutput = useSelector(
    (state: CalculatorRootState) => state.session.output,
  );
  const currentInput = useSelector(
    (state: CalculatorRootState) => state.session.input,
  );
  useHotkey("ctrl + alt + m", () => dispatch(resetDefinitions()));
  useHotkey("ctrl + alt + a", () => dispatch(resetAll()));
  useHotkey("alt + p", () => {
    let text = currentInput + "\n";
    if (currentOutput.type === "text") {
      text += currentOutput.text;
    } else if (currentOutput.type === "error") {
      text += currentOutput.error;
    } else {
      text += "non serializable output";
    }
    navigator.clipboard.writeText(text);
  });

  return (
    <div className={classNames("bottom-10", "mx-2",)}>
      <DesktopToolbar />
      <MobileToolbar />
    </div>
  );
}
