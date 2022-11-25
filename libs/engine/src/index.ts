import { GlobalDocumentationItem } from './types/Plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { parse } from '@arithmico/parser';
import evaluateNode from './eval';
import serialize from './serialize';
import { Context, Profile } from './types';
import trigonometryPlugin from './plugins/core/analysis/fragments/trigonometry';
import { insertStackObject } from './utils/context-utils';
import nsolvePlugin from './plugins/core/nsolve/nsolve';
import lsolvePlugin from './plugins/core/lsolve/lsolve';
import nintegratePlugin from './plugins/core/nintegrate/nintegrate';
import nderivePlugin from './plugins/core/nderive/nderive';
import minmaxPlugin from './plugins/core/minmax/minmax';
import absPlugin from './plugins/core/analysis/fragments/abs';
import crossPlugin from './plugins/core/cross/cross';
import statisticsPlugin from './plugins/core/statistics/statistics';
import rootsPlugin from './plugins/core/analysis/fragments/roots';
import physicalConstantsPlugin from './plugins/core/physical-constants/physical-constants';
import ifThenElsePlugin from './plugins/core/if-then-else/if-then-else';
import tablePlugin from './plugins/core/table/table';
import inverseMatrixPlugin from './plugins/core/inverse-matrix/inverse-matrix';
import load from './load';
import loadPluginStructures from './load/load-plugin-structure';
import { createProfile } from './utils/profile-utils';
import polynomialPlugin from './plugins/core/polynomials/polynomial';
import tensorPlugin from './plugins/core/tensor/tensor-plugin';
import roundPlugin from './plugins/core/analysis/fragments/round';
import listmodPlugin from './plugins/core/listmod/listmod-plugin';
import analysisPlugin from './plugins/core/analysis/analysis';
import discreteMathPlugin from './plugins/core/discrete-math/discrete-math';

export { serializeStack } from './utils/context-utils';

const plugins = [
    nsolvePlugin,
    lsolvePlugin,
    nintegratePlugin,
    nderivePlugin,
    minmaxPlugin,
    absPlugin,
    crossPlugin,
    statisticsPlugin,
    physicalConstantsPlugin,
    ifThenElsePlugin,
    tablePlugin,
    inverseMatrixPlugin,
    polynomialPlugin,
    tensorPlugin,
    listmodPlugin,
    analysisPlugin,
    discreteMathPlugin,
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
