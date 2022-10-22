import React from "react";
import styled from "styled-components";
import CalculatorTextfields from "@local-components/calculator-textfields/calculator-textfields";
import CalculatorToolbar from "@local-components/calculator-toolbar/calculator-toolbar";
import PageContainer from "@local-components/page-container/page-container";

const Container = styled(PageContainer)`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 2rem;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default function Calculator() {
  return (
    <Container>
      <CalculatorTextfields />
      <CalculatorToolbar />
    </Container>
  );
}
