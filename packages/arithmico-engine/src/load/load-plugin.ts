import { Context, Plugin, SyntaxTreeNode } from '../types';
import { existsOnStack, insertStackObject, loadMethod } from '../utils/context-utils';

function loadPluginObject(name: string, object: SyntaxTreeNode, context: Context) {
    if (existsOnStack(name, context)) {
        throw `LoadingError: An object named "${name}" has already been loaded.`;
    }

    return insertStackObject(name, object, context);
}

export default function loadPlugin(plugin: Plugin, context: Context) {
    const contextWithConstants = plugin.constants.reduce(
        (context, constant) => loadPluginObject(constant.name, constant.value, context),
        context,
    );

    const contextWithConstantsAndFunctions = plugin.functions.reduce(
        (context, func) => loadPluginObject(func.name, func.function, context),
        contextWithConstants,
    );

    const contextWithConstantsAndFunctionsAndMethods = plugin.methods.reduce(
        (context, method) => loadMethod(context, method),
        contextWithConstantsAndFunctions,
    );

    return contextWithConstantsAndFunctionsAndMethods;
}
