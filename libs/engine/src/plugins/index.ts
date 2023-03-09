import { Plugin } from '../types';
import algebraPlugin from './core/algebra/algebra';
import analysisPlugin from './core/analysis/analysis';
import computerSciencePlugin from './core/computer-science/computer-science';
import discreteMathPlugin from './core/discrete-math/discrete-math';
import numericsPlugin from './core/numerics/numerics';
import physicsPlugin from './core/physics/physics';
import excelPlugin from './core/excel/excel';
import statisticsPlugin from './core/statistics/statistics';

const defaultPlugins: Plugin[] = [
    analysisPlugin,
    numericsPlugin,
    algebraPlugin,
    statisticsPlugin,
    discreteMathPlugin,
    physicsPlugin,
    computerSciencePlugin,
    excelPlugin,
];

export default defaultPlugins;
