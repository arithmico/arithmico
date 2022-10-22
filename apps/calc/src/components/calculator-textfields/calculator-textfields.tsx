import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Textfield from "../textfield/textfield";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CalculatorRootState } from "@stores/calculator-store";
import {
  moveForwardInHistory,
  moveBackInHistory,
  setInput,
  resetInput,
  resetOutput,
} from "@stores/slices/calculator-session";
import useEvaluate from "../../hooks/use-evaluate";

const TextfieldsContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const MathTextfield = styled(Textfield)`
  width: 100%;
  font-family: "Source Code Pro", monospace;
  margin: 1rem;
`;

const ErrorTextfield = styled(MathTextfield)`
  color: var(--me-error);
  margin: 1rem;
`;

export default function CalculatorTextfields() {
  const dispatch = useDispatch();
  const evaluate = useEvaluate();
  const input = useSelector(
    (state: CalculatorRootState) => state.session.input
  );
  const output = useSelector(
    (state: CalculatorRootState) => state.session.output
  );
  const isError = useSelector(
    (state: CalculatorRootState) => state.session.error
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);
  const [t] = useTranslation();

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
    "ctrl + alt + i",
    () => {
      dispatch(resetInput());
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    { enableOnTags: ["INPUT"] }
  );

  useHotkeys(
    "ctrl + alt + o",
    () => {
      dispatch(resetOutput());
    },
    { enableOnTags: ["INPUT"] }
  );

  const onInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.length > 0) {
      evaluate();

      if (outputRef.current) {
        outputRef.current.focus();
      }
    }
  };

  const onOutputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      dispatch(moveBackInHistory());
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      dispatch(moveForwardInHistory());
      e.preventDefault();
    }
  };

  return (
    <TextfieldsContainer>
      <MathTextfield
        ref={inputRef}
        placeholder={t("common.input")}
        value={input}
        onChange={(e) => dispatch(setInput(e.target.value))}
        onKeyPress={onInputKeyPress}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      {isError ? (
        <ErrorTextfield
          ref={outputRef}
          placeholder={t("common.output")}
          readOnly
          value={output}
          onKeyPress={onOutputKeyPress}
        />
      ) : (
        <MathTextfield
          ref={outputRef}
          placeholder={t("common.output")}
          readOnly
          value={output}
          onKeyPress={onOutputKeyPress}
        />
      )}
    </TextfieldsContainer>
  );
}
