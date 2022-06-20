import React, { useEffect, useState, useRef } from 'react';
import { getDocumentation } from '@behrenle/number-cruncher';
import { GlobalDocumentationItem } from '@behrenle/number-cruncher/lib/types/Plugin';
import styled from 'styled-components';
import ManualSectionItem from '../../components/manual-section-item/manual-section-item';
import ManualSection from '../../components/manual-section/manual-section';
import PageContainer from '../../components/page-container/page-container';
import WithScrollbars from '../../components/with-scrollbars/with-scrollbars';
import hotkeys from '../../hotkeys.json';
import { useTranslation } from 'react-i18next';
import useSessionStore from '../../stores/session-store/use-session-store';
import ExternalLink from '../../components/external-link/external-link';

const DocumentationLink = styled(ExternalLink)`
  font-size: 2rem;
  margin-top: 1rem;
  display: block;
`;

const SearchField = styled.input.attrs({ type: 'search' })`
  margin-top: 2em;
  background-color: var(--me-background-100);
  outline: none;
  border: thin solid var(--me-text-200);
  border-radius: 10px;
  width: 100%;
  min-width: 100px;
  font-size: 2.5em;
  font-weight: var(--me-font-weight-normal);
  color: var(--me-text-400);
  padding: 0.6em 0.75em;

  &::placeholder {
    color: var(--me-text-100);
  }

  &:focus {
    border: thin solid var(--me-text-400);
  }
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
  const language = useSessionStore((state) => state.settings.language);
  const [documentation] = useState(() => getDocumentation());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [t] = useTranslation();
  const serachRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (serachRef.current) {
      serachRef.current.focus();
    }
  }, [serachRef]);

  const onSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchValue);
    }
  };

  return (
    <WithScrollbars>
      <PageContainer>
        <SearchField
          ref={serachRef}
          placeholder={t('manual.search')}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={onSearchEnter}
        />
        <ManualSection heading={t('manual.hotkeys')}>
          {Object.keys(hotkeys)
            .filter(
              (hotkey) =>
                hotkey.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t((hotkeys as Record<string, string>)[hotkey] as string)
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
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
              (item) => item.type === 'constant' && matchDocumentation(item, searchQuery, language)
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
              (item) => item.type === 'function' && matchDocumentation(item, searchQuery, language)
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
        <DocumentationLink href="https://docs.arithmico.com">
          {t('manual.fullDocumentation')}
        </DocumentationLink>
      </PageContainer>
    </WithScrollbars>
  );
}
