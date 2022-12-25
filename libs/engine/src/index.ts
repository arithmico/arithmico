import { GlobalDocumentationItem } from './types/plugin.types';
import { Context, EvaluationResult, Profile } from './types';
import load from './load';
import loadPluginStructures from './load/load-plugin-structure';
import { createProfile } from './utils/profile-utils';
import defaultPlugins from './plugins';
import evaluationPipeline from './pipeline';

export { serializeStack } from './utils/context-utils';

let defaultContext: Context;
let loadingLog: string[] = [];
let documentation: GlobalDocumentationItem[];

export function init(profile: Profile = createProfile()) {
    const loadingResult = load(defaultPlugins, profile);
    defaultContext = loadingResult[0];
    documentation = loadingResult[1];
    loadingLog = loadingResult[2];
}

export function getPluginStructures() {
    return loadPluginStructures(defaultPlugins);
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

export default function evaluate(input: string, context: Context = defaultContext): EvaluationResult {
    if (!context) {
        throw 'InitializationError: Arithmico Engine was not initialized';
    }

    return evaluationPipeline({ input, context });
}
