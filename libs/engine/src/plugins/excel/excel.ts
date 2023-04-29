import createPlugin from '../../utils/plugin-builder';
import excelConstantsFragment from './fragments/excel-constants';
import xoderFragment from './fragments/xoder';
import zweifakultaetFragment from './fragments/zweifakultaet';
import wurzelFragment from "./fragments/wurzel";

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
    .addFragment(wurzelFragment)
    .build();

export default excelPlugin;
