import React from 'react';
import styled from 'styled-components';

const Container = styled.section``;

const ManaulSectionHeading = styled.h1`
  font-size: 38px;
  font-weight: 300;
`;

interface ManualSectionProps {
  heading: string;
}

export default function ManualSection({ heading }: ManualSectionProps) {
  return (
    <Container>
      <ManaulSectionHeading>{heading}</ManaulSectionHeading>
    </Container>
  );
}
