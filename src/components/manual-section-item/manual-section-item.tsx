import React from 'react';
import styled from 'styled-components';

interface ManualSectionItemProps {
  synopsis: string;
  description: string;
}

const StyledDt = styled.dt`
  font-size: 2rem;
  background-color: var(--me-background-100);
  margin: 0;
  padding: 1rem;
  border-radius: 0.25rem 0 0 0.25rem;
`;

const StyledDd = styled.dd`
  font-size: 2rem;
  background-color: var(--me-background-100);
  margin: 0;
  padding: 1rem;
  border-radius: 0 0.25rem 0.25rem 0;
`;

export default function ManualSectionItem({ synopsis, description }: ManualSectionItemProps) {
  return (
    <>
      <StyledDt>{synopsis}</StyledDt>
      <StyledDd>{description}</StyledDd>
    </>
  );
}
