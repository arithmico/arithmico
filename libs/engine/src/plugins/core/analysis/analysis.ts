import createPluginV2 from '../../../utils/plugin-builder-v2';
import expFragment from './fragments/exp';
import logFragment from './fragments/log';
import trigonometryFragment from './fragments/trigonometry';
import rootsFragment from './fragments/roots';
import roundFragment from './fragments/round';
import absFragment from "./fragments/abs";

const analysisPlugin = createPluginV2('analysis', 'core', 'common analysis functions')
    .addFragment(expFragment)
    .addFragment(logFragment)
    .addFragment(trigonometryFragment)
    .addFragment(rootsFragment)
    .addFragment(roundFragment)
    .addFragment(absFragment)
    .build();

export default analysisPlugin;
