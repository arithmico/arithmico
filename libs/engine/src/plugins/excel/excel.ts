import createPlugin from '../../utils/plugin-builder';
import excelConstantsFragment from './fragments/excel-constants';
import xoderFragment from './fragments/xoder';
import zweifakultaetFragment from './fragments/zweifakultaet';

const excelPlugin = createPlugin({ en: 'Excel', de: 'Excel' }, 'core', { en: 'Test plugin.' })
    .addFragment(excelConstantsFragment)
    .addFragment(xoderFragment)
    .addFragment(zweifakultaetFragment)
    .build();

export default excelPlugin;
