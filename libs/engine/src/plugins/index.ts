import { Plugin } from '../types';
import algebraPlugin from './algebra/algebra';
import analysisPlugin from './analysis/analysis';
import computerSciencePlugin from './computer-science/computer-science';
import discreteMathPlugin from './discrete-math/discrete-math';
import graphicsPlugin from './graphics/graphics';
import numericsPlugin from './numerics/numerics';
import physicsPlugin from './physics/physics';
import statisticsPlugin from './statistics/statistics';

import excelPlugin from './core/excel/excel';

const defaultPlugins: Plugin[] = [
    analysisPlugin,
    numericsPlugin,
    algebraPlugin,
    statisticsPlugin,
    discreteMathPlugin,
    physicsPlugin,
    computerSciencePlugin,
    graphicsPlugin,
    excelPlugin,
];

export default defaultPlugins;
