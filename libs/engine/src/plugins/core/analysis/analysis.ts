import createPluginV2 from '../../../utils/plugin-builder-v2';
import expFragment from './fragments/exp-fragment';
import logFragment from './fragments/log-fragment';
import trigonometryFragment from './fragments/trigonometry';
import rootsFragment from './fragments/roots';
import roundFragment from './fragments/round';

const analysisPlugin = createPluginV2('analysis', 'core', 'common analysis functions')
    .addFragment(expFragment)
    .addFragment(logFragment)
    .addFragment(trigonometryFragment)
    .addFragment(rootsFragment)
    .addFragment(roundFragment)
    .build();

export default analysisPlugin;
