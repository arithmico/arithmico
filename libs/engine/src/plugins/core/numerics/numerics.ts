import createPlugin from '../../../utils/plugin-builder';
import nsolveFragment from './fragments/nsolve';
import nderiveFragment from './fragments/nderive';
import nintegrateFragment from './fragments/nintegrate';

const numericMethodsPlugin = createPlugin('core/numerics', 'core', 'Contains functions for numerical calculations.')
    .addFragment(nsolveFragment)
    .addFragment(nintegrateFragment)
    .addFragment(nderiveFragment)
    .build();

export default numericMethodsPlugin;
