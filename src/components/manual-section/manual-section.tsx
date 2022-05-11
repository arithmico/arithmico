import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  margin-top: 3rem;
`;

const ManaulSectionHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
`;

const StyledDl = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 0;
  padding: 0;
`;

interface ManualSectionProps {
  heading: string;
  children: React.ReactChild | React.ReactChild[];
}

export default function ManualSection({ heading, children }: ManualSectionProps) {
  if (!children || (children instanceof Array && children.length === 0)) {
    return null;
  }

  return (
    <Container>
      <ManaulSectionHeading>{heading}</ManaulSectionHeading>
      <StyledDl>{children}</StyledDl>
    </Container>
  );
}
