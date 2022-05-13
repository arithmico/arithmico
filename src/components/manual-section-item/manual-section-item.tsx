import React from 'react';
import styled from 'styled-components';
import useSessionStore from '../../stores/session-store/use-session-store';

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
`;

const StyledDd = styled.dd`
  font-size: 2rem;
  background-color: var(--me-background-100);
  margin: 0;
  padding: 1rem;
  border-radius: 0 0.25rem 0.25rem 0;
`;

export default function ManualSectionItem({
  synopsis,
  description,
  noCopy
}: ManualSectionItemProps) {
  const copySynopsisOnClick = useSessionStore((state) => state.copySynopsisOnClick);

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
