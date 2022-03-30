import { getLoadingLog } from '@behrenle/number-cruncher';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InfoProtocolItem from '../../components/info-protocol-item/info-protocol-item';
import MathProtocolItem from '../../components/math-protocol-item/math-protocol-item';
import PageContainer from '../../components/page-container/page-container';
import { InfoItem, MathItem } from '../../stores/session-store/types';
import useSessionStore from '../../stores/session-store/use-session-store';

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
  font-weight: 300;
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
  const history = useSessionStore((state) => state.protocol);
  const excludeInfo = useSessionStore((state) => state.excludeInfoInProtocol);
  const containerRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (containerRef.current.children.length === 0) {
      return;
    }

    containerRef.current.children[containerRef.current.children.length - 1].scrollIntoView({
      behavior: 'smooth'
    });
  }, [history, containerRef]);

  const protocolItems: (MathItem | InfoItem)[] = [
    ...getLoadingLog().map((value) => ({ type: 'info', info: value } as InfoItem)),
    ...history
  ].filter((item) => item.type === 'math' || !excludeInfo);
  console.log(protocolItems);

  return (
    <Container>
      <Header>
        <Title>Protocol</Title>
        <BackButton onClick={() => navigate('/')}>back</BackButton>
      </Header>
      <HistoryContainer ref={containerRef}>
        {protocolItems.map((historyItem, index) =>
          historyItem.type === 'math' ? (
            <MathProtocolItem item={historyItem} key={index} />
          ) : (
            <InfoProtocolItem item={historyItem} key={index} />
          )
        )}
      </HistoryContainer>
    </Container>
  );
}
