import { GlobalDocumentationItem } from './types/Plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { parse } from '@arithmico/parser';
import evaluateNode from './eval';
import serialize from './serialize';
import { Context, Profile } from './types';
import { insertStackObject } from './utils/context-utils';
import lsolvePlugin from './plugins/core/lsolve/lsolve';
import crossPlugin from './plugins/core/cross/cross';
import statisticsPlugin from './plugins/core/statistics/statistics';
import ifThenElsePlugin from './plugins/core/if-then-else/if-then-else';
import inverseMatrixPlugin from './plugins/core/inverse-matrix/inverse-matrix';
import load from './load';
import loadPluginStructures from './load/load-plugin-structure';
import { createProfile } from './utils/profile-utils';
import polynomialPlugin from './plugins/core/polynomials/polynomial';
import tensorPlugin from './plugins/core/tensor/tensor-plugin';
import listmodPlugin from './plugins/core/listmod/listmod-plugin';
import analysisPlugin from './plugins/core/analysis/analysis';
import discreteMathPlugin from './plugins/core/discrete-math/discrete-math';
import numericMethodsPlugin from './plugins/core/numerics/numerics';
import physicsPlugin from './plugins/core/physics/physics';

export { serializeStack } from './utils/context-utils';

const plugins = [
    lsolvePlugin,
    crossPlugin,
    statisticsPlugin,
    ifThenElsePlugin,
    inverseMatrixPlugin,
    polynomialPlugin,
    tensorPlugin,
    listmodPlugin,
    analysisPlugin,
    discreteMathPlugin,
    numericMethodsPlugin,
    physicsPlugin,
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
        if (!defaultContext) {
            throw 'InitializationError: NumberCruncher was not initialized';
        }
        context = defaultContext;
    }

    let nodeTree;

    try {
        nodeTree = parse(input, {
            language: context.options.decimalSeparator === ',' ? 'de' : 'en',
        });
    } catch (syntaxError) {
        throw syntaxError.message;
    }

    const result = evaluateNode(nodeTree, context);
    const resultString = serialize(result, context.options);

    if (result.type === 'define') {
        const value = result.value;
        return {
            result: resultString,
            context: insertStackObject(result.name, value, context),
        };
    }

    return {
        result: resultString,
        context,
    };
}
