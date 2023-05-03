import createPlugin from '../../utils/plugin-builder';
import excelConstantsFragment from './fragments/excel-constants';
import xoderFragment from './fragments/xoder';
import zweifakultaetFragment from './fragments/zweifakultaet';
import wurzelFragment from './fragments/wurzel';
import wennFragment from './fragments/wenn';
import zufallsbereichFragment from './fragments/zufallsbereich';

const excelPlugin = createPlugin(
    {
        en: 'Excel',
        de: 'Excel',
    },
    'core',
    {
        en: 'Function names from Microsoft Excel, specifically of the german language.',
        de: 'Funktionsnamen aus Microsoft Excel, speziell die der deutschen Sprache.',
    },
)
    .addFragment(excelConstantsFragment)
    .addFragment(xoderFragment)
    .addFragment(zweifakultaetFragment)
    .addFragment(wennFragment)
    .addFragment(wurzelFragment)
    .addFragment(zufallsbereichFragment)
    .build();

export default excelPlugin;
