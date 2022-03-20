import { parse } from './parse/parser';
import evaluateNode from './eval';
import serialize from './serialize';
import { Context, Options } from './types';
import loadPlugins from './utils/plugin-loader';
import trigonometryPlugin from './plugins/core/trigonometry';

const defaultOptions: Options = {
    decimalPlaces: 6,
    decimalSeparator: '.',
    magnitudeThresholdForScientificNotation: 6,
};

let defaultContext: Context;
let loadingLog: string[] = [];

export function loadDefaultContext() {
    const loadingResult = loadPlugins([trigonometryPlugin], defaultOptions);
    defaultContext = loadingResult.context;
    loadingLog = loadingResult.log;
}

export function getLoadingLog() {
    return loadingLog;
}

export default function evaluate(input: string, context: Context = defaultContext): string {
    if (!context) {
        if (!defaultContext) {
            loadDefaultContext();
        }
        context = defaultContext;
    }

    let nodeTree;

    try {
        nodeTree = parse(input);
    } catch (syntaxError) {
        throw syntaxError.message;
    }

    return serialize(evaluateNode(nodeTree, context), context.options);
}
