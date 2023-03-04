import { Context, EvaluationResult } from './types';
import load from './load';
import defaultPlugins from './plugins';
import evaluationPipeline from './pipeline';
import { createOptions } from './utils/context-utils';

export { serializeStack } from './utils/context-utils';
const loadingResult = load(defaultPlugins, createOptions());
const defaultContext = loadingResult.context;
const documentation = loadingResult.documentation;

export function init() {
    console.warn('init is deprecated');
}

export function getDocumentation() {
    if (!documentation) {
        init();
    }

    return documentation;
}

export function getDefaultContext() {
    if (!defaultContext) {
        init();
    }

    return defaultContext;
}

export default function evaluate(input: string, context?: Context): EvaluationResult {
    if (!context) {
        context = getDefaultContext();
    }

    return evaluationPipeline({ input, context });
}
