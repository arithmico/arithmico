import { PluginStructure } from './types/plugin.types';
import { Context, EvaluationResult, Profile } from './types';
import load from './load';
import { createProfile } from './utils/profile-utils';
import defaultPlugins from './plugins';
import evaluationPipeline from './pipeline';

export { serializeStack } from './utils/context-utils';

let defaultContext: Context;
let documentation: PluginStructure[];

export function init(profile: Profile = createProfile()) {
    const loadingResult = load(defaultPlugins, profile);
    defaultContext = loadingResult.context;
    documentation = loadingResult.documentation;
}

export function getDocumentation() {
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
