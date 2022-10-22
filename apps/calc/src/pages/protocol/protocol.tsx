import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "@local-components/page-container/page-container";
import ProtocolMathItem from "@local-components/protocol-math-item/protocol-math-item";
import { useSelector } from "react-redux";
import { CalculatorRootState } from "@stores/calculator-store";
import ProtocolInfoItem from "@local-components/protocol-info-item/info-protocol-item";
import ProtocolErrorItem from "@local-components/protocol-error-item/protocol-error-item";

const Container = styled(PageContainer)`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 1em;
  padding-bottom: 0;
`;

const Header = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: var(--me-font-weight-normal);
  margin: 0;
`;

const BackButton = styled.button`
  margin-left: auto;
  color: inherit;
  background-color: var(--me-background-100);
  outline: none;
  border: none;
  font-size: 2em;
  padding: 0.25em 1em;
  border-radius: 0.25em;

  &:disabled {
    color: var(--me-text-200);
  }

  &:enabled:hover {
    background-color: var(--me-background-300);
  }
`;

const HistoryContainer = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  & > li {
    margin-bottom: 1em;
  }

  & > li:first-child {
    margin-top: 2em;
  }
`;

export default function Protocol() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLUListElement>(null);
  const [t] = useTranslation();
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (containerRef.current.children.length === 0) {
      return;
    }

    containerRef.current.children[
      containerRef.current.children.length - 1
    ].scrollIntoView({
      behavior: "smooth",
    });
  }, [containerRef]);

  const protocolItems = useSelector(
    (state: CalculatorRootState) => state.session.protocol
  );

  return (
    <Container>
      <Header>
        <Title>{t("protocol")}</Title>
        <BackButton onClick={() => navigate("/")}>
          {t("common.back")}
        </BackButton>
      </Header>
      <HistoryContainer ref={containerRef}>
        {protocolItems.map((item, index) => {
          switch (item.type) {
            case "math":
              return (
                <ProtocolMathItem
                  input={item.input}
                  output={item.output}
                  key={index}
                />
              );

            case "info":
              return <ProtocolInfoItem message={item.info} key={index} />;

            case "error":
              return (
                <ProtocolErrorItem
                  input={item.input}
                  output={item.error}
                  key={index}
                />
              );
            default:
              return null;
          }
        })}
      </HistoryContainer>
    </Container>
  );
}
