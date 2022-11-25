import createPluginV2 from '../../../utils/plugin-builder-v2';
import nsolve from './fragments/nsolve';

const numericMethodsPlugin = createPluginV2(
    'core/numeric-methods',
    'core',
    'Contains functions for numerical calculation of values.',
)
    .addFragment(nsolve)
    .build();

export default numericMethodsPlugin;
