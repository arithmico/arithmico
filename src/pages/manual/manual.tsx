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
import useSessionStore from '../../stores/session-store/use-session-store';

const SearchField = styled(Textfield)`
  margin-top: 2em;
`;

function matchDocumentation(item: GlobalDocumentationItem, rawSearchStr: string, language: string) {
  const searchStr = rawSearchStr.toLocaleLowerCase();
  const doc = item.documentation[language as 'en' | 'de'];
  if (doc) {
    return (
      doc.synopsis.toLowerCase().includes(searchStr) ||
      doc.description.toLowerCase().includes(searchStr)
    );
  }

  const fallbackDoc = item.documentation.en;

  if (fallbackDoc) {
    return (
      fallbackDoc.synopsis.toLowerCase().includes(searchStr) ||
      fallbackDoc.description.toLowerCase().includes(searchStr)
    );
  }

  return false;
}

export default function Manual() {
  const language = useSessionStore((state) => state.language);
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
                hotkey.toLowerCase().includes(searchStr.toLowerCase()) ||
                t((hotkeys as Record<string, string>)[hotkey] as string)
                  .toLowerCase()
                  .includes(searchStr.toLowerCase())
            )
            .map((hotkey) => (
              <ManualSectionItem
                key={hotkey}
                noCopy={true}
                synopsis={(hotkey as string).toUpperCase()}
                description={t((hotkeys as Record<string, string>)[hotkey] as string)}
              />
            ))}
        </ManualSection>
        <ManualSection heading={t('manual.constants')}>
          {documentation
            .filter(
              (item) => item.type === 'constant' && matchDocumentation(item, searchStr, language)
            )
            .map((item) => (
              <ManualSectionItem
                key={item.documentation.en?.synopsis}
                synopsis={item.documentation.en?.synopsis || ''}
                description={
                  (language === 'de'
                    ? item.documentation.de?.description
                    : item.documentation.en?.description) || ''
                }
              />
            ))}
        </ManualSection>
        <ManualSection heading={t('manual.functions')}>
          {documentation
            .filter(
              (item) => item.type === 'function' && matchDocumentation(item, searchStr, language)
            )
            .map((item) => (
              <ManualSectionItem
                key={item.documentation.en?.synopsis}
                synopsis={item.documentation.en?.synopsis || ''}
                description={
                  (language === 'de'
                    ? item.documentation.de?.description
                    : item.documentation.en?.description) || ''
                }
              />
            ))}
        </ManualSection>
      </PageContainer>
    </WithScrollbars>
  );
}
