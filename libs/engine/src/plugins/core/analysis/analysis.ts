import createPlugin from '../../../utils/plugin-builder';
import expFragment from './fragments/exp';
import logFragment from './fragments/log';
import trigonometryFragment from './fragments/trigonometry';
import rootsFragment from './fragments/roots';
import roundFragment from './fragments/round';
import absFragment from './fragments/abs';
import minmaxFragment from './fragments/minmax';
import tableFragment from './fragments/table';

const analysisPlugin = createPlugin(
    {
        en: 'Analysis',
        de: 'Analysis',
    },
    'core',
    { en: 'common analysis functions' },
)
    .addFragment(expFragment)
    .addFragment(logFragment)
    .addFragment(trigonometryFragment)
    .addFragment(rootsFragment)
    .addFragment(tableFragment)
    .addFragment(roundFragment)
    .addFragment(absFragment)
    .addFragment(minmaxFragment)
    .build();

export default analysisPlugin;
