import { GlobalDocumentationItem } from './types/Plugin';
import { parse } from './parse/parser';
import evaluateNode from './eval';
import serialize from './serialize';
import { Context, Options } from './types';
import loadPlugins from './utils/plugin-loader';
import trigonometryPlugin from './plugins/core/trigonometry/trigonometry';
import { createOptions, insertStackObject } from './utils/context-utils';
import nsolvePlugin from './plugins/core/nsolve/nsolve';
import lsolvePlugin from './plugins/core/lsolve/lsolve';
import nintegratePlugin from './plugins/core/nintegrate/nintegrate';
import nderivePlugin from './plugins/core/nderive/nderive';
import expPlugin from './plugins/core/exp/exp';
import minmaxPlugin from './plugins/core/minmax/minmax';
import absPlugin from './plugins/core/abs/abs';
import fractionPlugin from './plugins/core/fraction/fraction';
import crossPlugin from './plugins/core/cross/cross';
import { transformEnglish2German, transformGerman2English } from './language-transform';
import statisticsPlugin from './plugins/core/statistics/statistics';
import rootsPlugin from './plugins/core/roots/roots';

export { serializeStack } from './utils/context-utils';

const defaultOptions = createOptions();

const plugins = [
    trigonometryPlugin,
    expPlugin,
    nsolvePlugin,
    lsolvePlugin,
    nintegratePlugin,
    nderivePlugin,
    minmaxPlugin,
    absPlugin,
    fractionPlugin,
    crossPlugin,
    statisticsPlugin,
    rootsPlugin,
];

let defaultContext: Context;
let loadingLog: string[] = [];
let documentation: GlobalDocumentationItem[];

export function init(options: Options = defaultOptions) {
    const loadingResult = loadPlugins(plugins, options);
    defaultContext = loadingResult.context;
    loadingLog = loadingResult.log;
    documentation = loadingResult.documentation;
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
        throw 'InitializationError: NumberCruncher was not initialized';
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
        if (context.options.decimalSeparator === ',') {
            nodeTree = parse(transformGerman2English(input));
        } else {
            nodeTree = parse(input);
        }
    } catch (syntaxError) {
        throw syntaxError.message;
    }

    const result = evaluateNode(nodeTree, context);
    const resultString = serialize(result, context.options);

    if (result.type === 'define') {
        const value = result.value;
        return {
            result: context.options.decimalSeparator === ',' ? transformEnglish2German(resultString) : resultString,
            context: insertStackObject(result.name, value, context),
        };
    }

    return {
        result: context.options.decimalSeparator === ',' ? transformEnglish2German(resultString) : resultString,
        context,
    };
}
