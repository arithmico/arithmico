import { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import classNames from "classnames";
import CalculatorOutput from "../calculator-output/calculator-output";
import CalculatorInput from "../calculator-input/calculator-input";
import { useDispatch, useSelector } from "react-redux";
import { resetInput, resetOutput } from "../../store/slices/session.slice";
import { ResetTextFieldButton } from "./reset-text-field-button";
import { CalculatorRootState } from "../../store/store";
import { useTranslation } from "react-i18next";

export default function CalculatorForm() {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLElement>(null);
  const [focusNext, setFocusNext] = useState<"input" | "output" | null>(null);
  const [t] = useTranslation();
  const currentOutput = useSelector(
    (state: CalculatorRootState) => state.session.output,
  );

  useEffect(() => {
    if (focusNext === "input" && inputRef.current) {
      inputRef.current.focus();
      setFocusNext(null);
    } else if (focusNext === "output" && outputRef.current) {
      outputRef.current.focus();
      setFocusNext(null);
    }
  }, [focusNext, setFocusNext]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useHotkeys(
    "alt + i",
    () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    { enableOnFormTags: ["INPUT"] },
  );

  useHotkeys(
    "alt + o",
    () => {
      if (outputRef.current) {
        outputRef.current.focus();
      }
    },
    { enableOnFormTags: ["INPUT"] },
  );

  useHotkeys(
    "ctrl + i",
    (event) => {
      event.preventDefault();
      dispatch(resetInput());
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    { enableOnFormTags: ["INPUT"] },
  );

  useHotkeys(
    "ctrl + o",
    (event) => {
      event.preventDefault();
      dispatch(resetOutput());
    },
    { enableOnFormTags: ["INPUT"] },
  );

  return (
    <div
      className={classNames(
        "w-full",
        "h-full",
        "flex",
        "flex-col",
        "justify-center",
      )}
    >
      <div className={classNames("flex", "mb-4", "mx-2")}>
        <label className={"sr-only"}>{t("common.input")}</label>
        <CalculatorInput
          ref={inputRef}
          onEnterPressed={() => setFocusNext("output")}
        />
        <ResetTextFieldButton
          text={t("toolbar.resetInput")}
          onClick={() => dispatch(resetInput())}
        />
      </div>

      {currentOutput.type !== "graphic" ? (
        <div className={classNames("flex", "mx-2")}>
          <label className={"sr-only"}>{t("common.output")}</label>
          <CalculatorOutput
            ref={outputRef}
            onEnterPressed={() => setFocusNext("input")}
          />
          <ResetTextFieldButton
            text={t("toolbar.resetOutput")}
            onClick={() => dispatch(resetOutput())}
          />
        </div>
      ) : (
        <CalculatorOutput
          ref={outputRef}
          onEnterPressed={() => setFocusNext("input")}
        />
      )}
    </div>
  );
}
