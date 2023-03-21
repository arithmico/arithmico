import { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { resetInput, resetOutput } from "@stores/slices/calculator-session";
import classNames from "classnames";
import CalculatorOutput from "../calculator-output/calculator-output";
import CalculatorInput from "../calculator-input/calculator-input";
import { useDispatch } from "react-redux";

export default function CalculatorForm() {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLElement>(null);
  const [focusNext, setFocusNext] = useState<"input" | "output" | null>(null);

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
    { enableOnTags: ["INPUT"] }
  );

  useHotkeys(
    "alt + o",
    () => {
      if (outputRef.current) {
        outputRef.current.focus();
      }
    },
    { enableOnTags: ["INPUT"] }
  );

  useHotkeys(
    "ctrl + i",
    () => {
      dispatch(resetInput());
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    { enableOnTags: ["INPUT"] }
  );

  useHotkeys(
    "ctrl + o",
    (event) => {
      event.preventDefault();
      dispatch(resetOutput());
    },
    { enableOnTags: ["INPUT"] }
  );

  return (
    <div
      className={classNames(
        "w-full",
        "h-full",
        "flex",
        "flex-col",
        "justify-center",
        "max-h-full",
        "overflow-hidden"
      )}
    >
      <CalculatorInput
        ref={inputRef}
        onEnterPressed={() => setFocusNext("output")}
      />

      <CalculatorOutput
        ref={outputRef}
        onEnterPressed={() => setFocusNext("input")}
      />
    </div>
  );
}
