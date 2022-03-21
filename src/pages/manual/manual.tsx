import { getDocumentation } from '@behrenle/number-cruncher';
import React, { useState } from 'react';
import styled from 'styled-components';
import ManualSectionItem from '../../components/manual-section-item/manual-section-item';
import ManualSection from '../../components/manual-section/manual-section';
import PageContainer from '../../components/page-container/page-container';

const SearchField = styled.input.attrs({ type: 'text' })`
  background-color: rgba(255, 255, 255, 0.05);
  height: 100px;
  border: 2px solid white;
  border-radius: 10px;
  width: 100%;
  outline: none;
  //background-color: transparent;
  color: white;
  font-size: 24px;
  padding: 20px;
`;

export default function Manual() {
  const [documentation] = useState(() => getDocumentation());

  return (
    <PageContainer>
      <SearchField placeholder="Search" />
      <ManualSection heading="Hotkeys">
        <ManualSectionItem synopsis="ALT + I" description="Focus input field" />
      </ManualSection>
      <ManualSection heading="Constants">
        {documentation
          .filter((item) => item.type === 'constant')
          .map((item) => (
            <ManualSectionItem
              key={item.documentation.en?.synopsis}
              synopsis={item.documentation.en?.synopsis || ''}
              description={item.documentation.en?.description || ''}
            />
          ))}
      </ManualSection>
      <ManualSection heading="Functions">
        {documentation
          .filter((item) => item.type === 'function')
          .map((item) => (
            <ManualSectionItem
              key={item.documentation.en?.synopsis}
              synopsis={item.documentation.en?.synopsis || ''}
              description={item.documentation.en?.description || ''}
            />
          ))}
      </ManualSection>
    </PageContainer>
  );
}
