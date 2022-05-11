import React, { useState } from 'react';
import { getDocumentation } from '@behrenle/number-cruncher';
import { GlobalDocumentationItem } from '@behrenle/number-cruncher/lib/types/Plugin';
import styled from 'styled-components';
import ManualSectionItem from '../../components/manual-section-item/manual-section-item';
import ManualSection from '../../components/manual-section/manual-section';
import PageContainer from '../../components/page-container/page-container';
import WithScrollbars from '../../components/with-scrollbars/with-scrollbars';
import Textfield from '../../components/textfield/textfield';
import hotkeys from '../../hotkeys.json';

const SearchField = styled(Textfield)`
  margin-top: 2em;
  margin-bottom: 1em;
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
          {Object.keys(hotkeys).map((hotkey) => (
            <ManualSectionItem
              key={hotkey}
              synopsis={(hotkey as string).toUpperCase()}
              description={(hotkeys as Record<string, string>)[hotkey] as string}
            />
          ))}
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
