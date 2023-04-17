import createPlugin from '../../utils/plugin-builder';
import distributionFragment from './fragments/distributions';
import samplingStatisticsFragment from './fragments/sampling-statistics';
import miscellaneousStatisticsFragment from './fragments/miscellaneous';

const statisticsPlugin = createPlugin({ en: 'Statistics', de: 'Statistik' }, 'core', {
    en: 'adds erf, normal, cnormal, binco, binom, cbinom and another statistical functions',
})
    .addFragment(distributionFragment)
    .addFragment(samplingStatisticsFragment)
    .addFragment(miscellaneousStatisticsFragment)
    .build();

export default statisticsPlugin;
