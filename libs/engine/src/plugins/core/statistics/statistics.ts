import createPluginV2 from '../../../utils/plugin-builder-v2';
import distributionFragment from './fragments/distributions';
import samplingStatisticsFragment from './fragments/sampling-statistics';
import miscellaneousStatisticsFragment from "./fragments/miscellaneous";

const statisticsPlugin = createPluginV2(
    'core/statistics',
    'core',
    'adds erf, normal, cnormal, binco, binom, cbinom and another statistical functions',
)
    .addFragment(distributionFragment)
    .addFragment(samplingStatisticsFragment)
    .addFragment(miscellaneousStatisticsFragment)
    .build();

export default statisticsPlugin;
