import React from 'react';
import styled from 'styled-components';

const StyledAddress = styled.address`
  display: flex;
  flex-direction: column;
  font-style: normal;

  & > a {
    text-decoration: none;
    color: white;
    opacity: 0.6;
  }
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
      {email ? (
        <>
          <a href={`mailto:${email}`}>{email}</a>
        </>
      ) : null}
      {url ? (
        <>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </>
      ) : null}
    </StyledAddress>
  );
}
