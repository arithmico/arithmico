import createPlugin from '../../utils/plugin-builder';
import excelConstantsFragment from './fragments/excel-constants';
import xoderFragment from './fragments/xoder';

const excelPlugin = createPlugin({ en: 'Excel', de: 'Excel' }, 'core', { en: 'Test plugin.' })
    .addFragment(excelConstantsFragment)
    .addFragment(xoderFragment)
    .build();

export default excelPlugin;
