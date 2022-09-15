import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useSessionStore, {
  useDispatch,
} from "../../stores/session-store/use-session-store";
import { MathItem } from "../../stores/session-store/types";
import Textfield from "../textfield/textfield";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";

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
  margin-bottom: 5rem;
`;

const ErrorTextfield = styled(MathTextfield)`
  color: var(--me-error);
`;

export default function CalculatorTextfields() {
  const dispatch = useDispatch();
  const input = useSessionStore((state) => state.session.input);
  const setInput = (input: string) => dispatch({ type: "setInput", input });
  const outputResetted = useSessionStore(
    (state) => state.session.outputResetted
  );
  const evaluate = () => dispatch({ type: "evaluate" });
  const resetInput = () => dispatch({ type: "resetInput" });
  const resetOutput = () => dispatch({ type: "resetOutput" });
  const goBackInHistory = () => dispatch({ type: "goBackInInputHistory" });
  const goForwardInHistory = () =>
    dispatch({ type: "goForwardInInputHistory" });
  const mathItems = useSessionStore((state) =>
    state.session.protocol.filter((hItem) => hItem.type === "math")
  ) as MathItem[];
  const lastOutput =
    !outputResetted && mathItems.length > 0
      ? mathItems[mathItems.length - 1].output
      : "";
  const isError =
    mathItems.length > 0 ? mathItems[mathItems.length - 1].error : false;
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
      resetInput();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    { enableOnTags: ["INPUT"] }
  );

  useHotkeys(
    "ctrl + alt + o",
    () => {
      resetOutput();
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
      goBackInHistory();
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      goForwardInHistory();
      e.preventDefault();
    }
  };

  return (
    <TextfieldsContainer>
      <MathTextfield
        ref={inputRef}
        placeholder={t("common.input")}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={onInputKeyPress}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      {isError ? (
        <ErrorTextfield
          ref={outputRef}
          placeholder={t("common.output")}
          readOnly
          value={lastOutput}
          onKeyPress={onOutputKeyPress}
        />
      ) : (
        <MathTextfield
          ref={outputRef}
          placeholder={t("common.output")}
          readOnly
          value={lastOutput}
          onKeyPress={onOutputKeyPress}
        />
      )}
    </TextfieldsContainer>
  );
}
