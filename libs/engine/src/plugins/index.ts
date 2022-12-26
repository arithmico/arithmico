import { Plugin } from '../types';
import algebraPlugin from './algebra/algebra';
import analysisPlugin from './analysis/analysis';
import computerSciencePlugin from './computer-science/computer-science';
import discreteMathPlugin from './discrete-math/discrete-math';
import numericsPlugin from './numerics/numerics';
import physicsPlugin from './physics/physics';
import statisticsPlugin from './statistics/statistics';

const defaultPlugins: Plugin[] = [
    analysisPlugin,
    numericsPlugin,
    algebraPlugin,
    statisticsPlugin,
    discreteMathPlugin,
    physicsPlugin,
    computerSciencePlugin,
];

export default defaultPlugins;
