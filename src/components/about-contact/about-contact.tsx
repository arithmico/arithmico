import React from 'react';
import styled from 'styled-components';
import ExternalLink from '../external-link/external-link';

const StyledAddress = styled.address`
  display: flex;
  flex-direction: column;
  font-style: normal;
`;

interface AboutContactProps {
  name: string;
  email?: string;
  url?: string;
}

export default function AboutContact({ name, email, url }: AboutContactProps) {
  return (
    <StyledAddress>
      <span>{name}</span>
      {email ? <ExternalLink href={`mailto:${email}`}>{email}</ExternalLink> : null}
      {url ? <ExternalLink href={url}>{url}</ExternalLink> : null}
    </StyledAddress>
  );
}
