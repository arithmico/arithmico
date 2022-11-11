import createPluginV2 from '../../../utils/plugin-builder-v2';
import expFragment from './fragments/exp-fragment';
import logFragment from './fragments/log-fragment';

const analysisPlugin = createPluginV2('analysis', 'core', 'common analysis functions')
    .addFragment(expFragment)
    .addFragment(logFragment)
    .build();

export default analysisPlugin;
