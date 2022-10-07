import { CalculatorRootState } from "@stores/calculator-store";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

interface ManualSectionItemProps {
  synopsis: string;
  description: string;
  noCopy?: boolean;
}

const StyledDt = styled.dt`
  font-size: 2rem;
  background-color: var(--me-background-100);
  margin: 0;
  padding: 1rem;
  border-radius: 0.25rem 0 0 0.25rem;
  font-weight: var(--me-font-weight-normal);
`;

const StyledDd = styled.dd`
  font-size: 2rem;
  background-color: var(--me-background-100);
  margin: 0;
  padding: 1rem;
  border-radius: 0 0.25rem 0.25rem 0;
  font-weight: var(--me-font-weight-normal);
`;

export default function ManualSectionItem({
  synopsis,
  description,
  noCopy,
}: ManualSectionItemProps) {
  const copySynopsisOnClick = useSelector(
    (state: CalculatorRootState) => state.settings.copySynopsisOnClick
  );

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!noCopy && copySynopsisOnClick && e.button === 0) {
      navigator.clipboard.writeText(synopsis);
    }
  };

  return (
    <>
      <StyledDt onClick={onClick}>{synopsis}</StyledDt>
      <StyledDd>{description}</StyledDd>
    </>
  );
}
