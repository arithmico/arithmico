import createPlugin from '../../utils/plugin-builder';
import distributionFragment from './fragments/distributions';
import samplingStatisticsFragment from './fragments/sampling-statistics';
import miscellaneousStatisticsFragment from './fragments/miscellaneous';
import regressionsFragment from './fragments/regressions';

const statisticsPlugin = createPlugin({ en: 'Statistics', de: 'Statistik' }, 'core', {
    en: 'adds erf, normal, cnormal, binco, binom, cbinom and another statistical functions',
})
    .addFragment(distributionFragment)
    .addFragment(samplingStatisticsFragment)
    .addFragment(miscellaneousStatisticsFragment)
    .addFragment(regressionsFragment)
    .build();

export default statisticsPlugin;
