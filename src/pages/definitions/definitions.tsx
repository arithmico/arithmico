import React from 'react';
import styled from 'styled-components';
import { serializeStack } from '@behrenle/number-cruncher';
import PageContainer from '../../components/page-container/page-container';
import WithScrollbars from '../../components/with-scrollbars/with-scrollbars';
import useSessionStore from '../../stores/session-store/use-session-store';
import { Context } from '@behrenle/number-cruncher/lib/types';
import DefinitionListItem from '../../components/definition-list-item/definition-list-item';
import { useTranslation } from 'react-i18next';

const Heading = styled.h1`
  font-weight: 300;
  font-size: 2.5em;
  margin-top: 2em;
  color: var(--me-text-400);
`;

const DefinitionList = styled.dl`
  display: grid;
  grid-row-gap: 2rem;
  grid-template-columns: auto 5fr;

  & > dt,
  dd {
    font-size: 2rem;
    font-weight: 300;
    font-family: 'Source Code Pro', monospace;
    padding-left: 5rem;
  }

  & > dd {
    padding: 0;
  }

  & > dd {
  }

  & > dd::before {
    content: ':=';
    font-family: 'Source Code Pro', monospace;
    padding-right: 2rem;
  }
`;

export default function Definitions() {
  const context: Context = useSessionStore((state) => ({
    stack: state.stack,
    options: {
      decimalPlaces: state.decimalPlaces,
      decimalSeparator: '.',
      magnitudeThresholdForScientificNotation: state.decimalPlaces
    }
  }));
  const definitions = serializeStack(context);
  const [t] = useTranslation();

  return (
    <WithScrollbars>
      <PageContainer>
        <Heading>{t('definitions')}</Heading>
        <DefinitionList>
          {Object.entries(definitions).map(([name, definition]) => (
            <DefinitionListItem key={name} name={name} definition={definition} />
          ))}
        </DefinitionList>
      </PageContainer>
    </WithScrollbars>
  );
}
