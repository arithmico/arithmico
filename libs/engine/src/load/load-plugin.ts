import { Context, Plugin, Profile, SyntaxTreeNode } from '../types';
import { existsOnStack, insertStackObject, loadMethod } from '../utils/context-utils';

function loadPluginObject(name: string, object: SyntaxTreeNode, context: Context, profile: Profile) {
    if (existsOnStack(name, context)) {
        throw `LoadingError: An object named "${name}" has already been loaded.`;
    }

    if (
        (profile.loadingMode === 'blacklist' && !profile.loadingList.includes(name)) ||
        (profile.loadingMode === 'whitelist' && profile.loadingList.includes(name))
    ) {
        return insertStackObject(name, object, context);
    }
}

export default function loadPlugin(plugin: Plugin, context: Context, profile: Profile) {
    const contextWithConstants = plugin.constants.reduce(
        (context, constant) => loadPluginObject(constant.name, constant.value, context, profile),
        context,
    );

    const contextWithConstantsAndFunctions = plugin.functions.reduce(
        (context, func) => loadPluginObject(func.name, func.function, context, profile),
        contextWithConstants,
    );

    const contextWithConstantsAndFunctionsAndMethods = plugin.methods.reduce(
        (context, method) => loadMethod(context, method),
        contextWithConstantsAndFunctions,
    );

    return contextWithConstantsAndFunctionsAndMethods;
}
