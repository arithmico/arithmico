import { getLoadingLog } from '@behrenle/number-cruncher';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import InfoProtocolItem from '../../components/info-protocol-item/info-protocol-item';
import MathProtocolItem from '../../components/math-protocol-item/math-protocol-item';
import PageContainer from '../../components/page-container/page-container';
import useSessionStore from '../../stores/useSessionStore';

const HistoryContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1em;
`;

export default function Protocol() {
  const history = useSessionStore((state) => state.protocol);
  const containerRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.children[containerRef.current.children.length - 1].scrollIntoView({
      behavior: 'smooth'
    });
  }, [history, containerRef]);

  return (
    <PageContainer>
      <HistoryContainer ref={containerRef}>
        {getLoadingLog().map((value, index) => (
          <InfoProtocolItem key={index} item={{ type: 'info', info: value }} />
        ))}
        {history.map((historyItem, index) =>
          historyItem.type === 'math' ? (
            <MathProtocolItem item={historyItem} key={index} />
          ) : (
            <InfoProtocolItem item={historyItem} key={index} />
          )
        )}
      </HistoryContainer>
    </PageContainer>
  );
}
