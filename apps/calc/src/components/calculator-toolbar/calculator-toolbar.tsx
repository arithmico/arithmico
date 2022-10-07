import { CalculatorRootState } from "@stores/calculator-store";
import {
  resetAll,
  resetDefinitions,
  resetInput,
  resetOutput,
  resetProtocol,
} from "@stores/slices/calculator-session";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useExportProtocol from "../../hooks/use-export-protocol";
import useHotkey from "../../hooks/use-hotkey";

const ToolbarContainer = styled.aside`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-flow: column;
`;

const Button = styled.button`
  background-color: var(--me-background-100);
  color: var(--me-text-400);
  border-radius: 0.25em;
  border: none;
  outline: none;
  flex: 1;
  height: 70px;
  font-size: 1.5em;
  font-weight: var(--me-font-weight-normal);
  text-align: left;
  padding: 0 20px;

  &:disabled {
    color: var(--me-text-200);
  }

  &:enabled:hover {
    background-color: var(--me-background-300);
  }

  &:enabled:focus {
    border: 1px solid var(--me-text-400);
  }
`;

export default function CalculatorToolbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOutput = useSelector(
    (state: CalculatorRootState) => state.session.input
  );
  const currentInput = useSelector(
    (state: CalculatorRootState) => state.session.output
  );
  const [t] = useTranslation();
  const exportProtocol = useExportProtocol();

  useHotkey("ctrl + alt + m", () => dispatch(resetDefinitions()));
  useHotkey("ctrl + alt + a", () => dispatch(resetAll()));
  useHotkey("alt + p", () =>
    navigator.clipboard.writeText(currentInput + "\n" + currentOutput)
  );

  return (
    <ToolbarContainer>
      <Button onClick={() => dispatch(resetInput())}>
        {t("toolbar.resetInput")}
      </Button>
      <Button onClick={() => dispatch(resetOutput)}>
        {t("toolbar.resetOutput")}
      </Button>

      <Button onClick={() => navigate("/definitions")}>
        {t("toolbar.showDefinitions")}
      </Button>
      <Button onClick={() => dispatch(resetDefinitions())}>
        {t("toolbar.resetDefinitions")}
      </Button>

      <Button onClick={() => navigate("/protocol")}>
        {t("toolbar.showProtocol")}
      </Button>
      <Button onClick={() => dispatch(resetProtocol())}>
        {t("toolbar.resetProtocol")}
      </Button>

      <Button onClick={exportProtocol}>{t("toolbar.exportProtocol")}</Button>
      <Button onClick={() => dispatch(resetAll())}>
        {t("toolbar.resetAll")}
      </Button>
    </ToolbarContainer>
  );
}
