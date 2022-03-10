import React from 'react';
import styled from 'styled-components';

interface ManualSectionItemProps {
  synopsis: string;
  description: string;
}

const StyledDt = styled.dt`
  font-size: 24px;
`;

const StyledDd = styled.dd`
  font-size: 24px;
`;

export default function ManualSectionItem({ synopsis, description }: ManualSectionItemProps) {
  return (
    <>
      <StyledDt>{synopsis}</StyledDt>
      <StyledDd>{description}</StyledDd>
    </>
  );
}
