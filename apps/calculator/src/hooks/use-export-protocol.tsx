import { useTranslation } from 'react-i18next';
import useDownloadText from './use-download-text';
import useProtocol from './use-protocol';

export default function useExportProtocol() {
  const protocol = useProtocol();
  const save = useDownloadText();
  const [t] = useTranslation();
  return () => {
    save(
      protocol
        .map((item) => {
          if (item.type === 'math') {
            return `${t('common.input')}: ${item.input}\n${t('common.output')}: ${item.output}`;
          }
          return `INFO: ${item.info}`;
        })
        .join('\n\n'),
      `${t('protocol')}.txt`
    );
  };
}
