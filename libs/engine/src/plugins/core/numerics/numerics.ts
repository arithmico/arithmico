import createPluginV2 from '../../../utils/plugin-builder-v2';
import nsolveFragment from './fragments/nsolve';
import nderiveFragment from './fragments/nderive';
import nintegrateFragment from './fragments/nintegrate';

const numericMethodsPlugin = createPluginV2('core/numerics', 'core', 'Contains functions for numerical calculations.')
    .addFragment(nsolveFragment)
    .addFragment(nintegrateFragment)
    .addFragment(nderiveFragment)
    .build();

export default numericMethodsPlugin;
