import createPluginV2 from '../../../utils/plugin-builder-v2';
import nsolveFragment from './fragments/nsolve';
import nderiveFragment from './fragments/nderive';
import nintegrateFragment from './fragments/nintegrate';

const numericMethodsPlugin = createPluginV2(
    'core/numeric-methods',
    'core',
    'Contains functions for numerical calculation of values.',
)
    .addFragment(nsolveFragment)
    .addFragment(nintegrateFragment)
    .addFragment(nderiveFragment)
    .build();

export default numericMethodsPlugin;
