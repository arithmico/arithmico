import React, { useEffect, useState, useRef } from 'react';
import { getDocumentation } from '@behrenle/number-cruncher';
import { GlobalDocumentationItem } from '@behrenle/number-cruncher/lib/types/Plugin';
import styled from 'styled-components';
import ManualSectionItem from '../../components/manual-section-item/manual-section-item';
import ManualSection from '../../components/manual-section/manual-section';
import PageContainer from '../../components/page-container/page-container';
import WithScrollbars from '../../components/with-scrollbars/with-scrollbars';
import Textfield from '../../components/textfield/textfield';
import hotkeys from '../../hotkeys.json';
import { useTranslation } from 'react-i18next';

const SearchField = styled(Textfield)`
  margin-top: 2em;
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
  const [t] = useTranslation();
  const serachRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (serachRef.current) {
      serachRef.current.focus();
    }
  }, [serachRef]);

  return (
    <WithScrollbars>
      <PageContainer>
        <SearchField
          ref={serachRef}
          placeholder={t('manual.search')}
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
        />
        <ManualSection heading={t('manual.hotkeys')}>
          {Object.keys(hotkeys)
            .filter(
              (hotkey) =>
                hotkey.includes(searchStr) ||
                ((hotkeys as Record<string, string>)[hotkey] as string).includes(searchStr)
            )
            .map((hotkey) => (
              <ManualSectionItem
                key={hotkey}
                synopsis={(hotkey as string).toUpperCase()}
                description={t((hotkeys as Record<string, string>)[hotkey] as string)}
              />
            ))}
        </ManualSection>
        <ManualSection heading={t('manual.constants')}>
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
        <ManualSection heading={t('manual.functions')}>
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
