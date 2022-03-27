import React, { useState } from 'react';
import { getDocumentation } from '@behrenle/number-cruncher';
import { GlobalDocumentationItem } from '@behrenle/number-cruncher/lib/types/Plugin';
import styled from 'styled-components';
import ManualSectionItem from '../../components/manual-section-item/manual-section-item';
import ManualSection from '../../components/manual-section/manual-section';
import PageContainer from '../../components/page-container/page-container';
import WithScrollbars from '../../components/with-scrollbars/with-scrollbars';

const SearchField = styled.input.attrs({ type: 'text' })`
  background-color: rgba(255, 255, 255, 0.05);
  height: 100px;
  border: 1px solid white;
  border-radius: 10px;
  width: 100%;
  outline: none;
  color: white;
  font-size: 2.5em;
  font-weight: 300;
  padding: 20px;
  margin-bottom: 2em;
`;

function matchDocumentation(doc: GlobalDocumentationItem, searchStr: string) {
  return (
    doc.documentation.en?.synopsis.includes(searchStr) ||
    doc.documentation.en?.description.includes(searchStr)
  );
}

export default function Manual() {
  const [documentation] = useState(() => getDocumentation());
  const [searchStr, setSearchStr] = useState('');

  return (
    <WithScrollbars>
      <PageContainer>
        <SearchField
          placeholder="Search"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
        />
        <ManualSection heading="Hotkeys">
          <ManualSectionItem synopsis="ALT + I" description="Focus input field" />
        </ManualSection>
        <ManualSection heading="Constants">
          {documentation
            .filter((item) => item.type === 'constant' && matchDocumentation(item, searchStr))
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
            .filter((item) => item.type === 'function' && matchDocumentation(item, searchStr))
            .map((item) => (
              <ManualSectionItem
                key={item.documentation.en?.synopsis}
                synopsis={item.documentation.en?.synopsis || ''}
                description={item.documentation.en?.description || ''}
              />
            ))}
        </ManualSection>
      </PageContainer>
    </WithScrollbars>
  );
}
