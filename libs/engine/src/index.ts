import { GlobalDocumentationItem } from './types/Plugin';
import { Context, Profile } from './types';
import load from './load';
import loadPluginStructures from './load/load-plugin-structure';
import { createProfile } from './utils/profile-utils';
import analysisPlugin from './plugins/core/analysis/analysis';
import numericsPlugin from './plugins/core/numerics/numerics';
import algebraPlugin from './plugins/core/algebra/algebra';
import statisticsPlugin from './plugins/core/statistics/statistics';
import discreteMathPlugin from './plugins/core/discrete-math/discrete-math';
import physicsPlugin from './plugins/core/physics/physics';
import computerSciencePlugin from './plugins/core/computer-science/computer-science';
import evaluateInput from './evaluation-pipeline';

export { serializeStack } from './utils/context-utils';

const plugins = [
    analysisPlugin,
    numericsPlugin,
    algebraPlugin,
    statisticsPlugin,
    discreteMathPlugin,
    physicsPlugin,
    computerSciencePlugin,
];

let defaultContext: Context;
let loadingLog: string[] = [];
let documentation: GlobalDocumentationItem[];

export function init(profile: Profile = createProfile()) {
    const loadingResult = load(plugins, profile);
    defaultContext = loadingResult[0];
    documentation = loadingResult[1];
    loadingLog = loadingResult[2];
}

export function getPluginStructures() {
    return loadPluginStructures(plugins);
}

export function isInitialized() {
    return !!defaultContext;
}

export function getDocumentation() {
    return documentation;
}

export function getLoadingLog() {
    return loadingLog;
}

export function getDefaultContext() {
    if (!defaultContext) {
        init();
    }

    return defaultContext;
}

export interface EvaluateResult {
    result: string;
    context: Context;
}

export default function evaluate(input: string, context: Context = defaultContext): EvaluateResult {
    if (!context) {
        throw 'InitializationError: Arithmico Engine was not initialized';
    }

    return evaluateInput({ input, context });
}
