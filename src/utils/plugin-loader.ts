import { Context, Plugin, SyntaxTreeNode, PluginFunction, PluginConstant, Options } from '../types';
import { insertStackObject, useStrictContextValidator } from './context-utils';
import { parse } from '../parse/parser';
import evaluate from '../eval';

function loadPluginFunction(pluginFunction: PluginFunction, context: Context): Context {
    return insertStackObject(
        pluginFunction.name,
        {
            type: 'function',
            evaluateParametersBefore: pluginFunction.evaluateParametersBefore,
            evaluator: (parameters, context) => {
                pluginFunction.parameterValidator(parameters);
                return pluginFunction.evaluator(parameters, context);
            },
        },
        context,
    );
}

function loadPluginConstant(pluginConstant: PluginConstant, context: Context): Context {
    return insertStackObject(
        pluginConstant.name,
        {
            type: 'value',
            value: pluginConstant.value,
        },
        context,
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function loadPluginInlineDefinition(pluginInlineDefinition: string, context: Context) {
    let node: SyntaxTreeNode;
    try {
        node = parse(pluginInlineDefinition);
    } catch (e) {
        throw `LoadingError: syntax error in inline definition: ${e.message}`;
    }
    if (node.type !== 'defineFunction' && node.type !== 'defineVariable') {
        throw 'LoadingError: inline definition string is not of type "defineFunction" or "defineVariable"';
    }
    useStrictContextValidator(node.name, context);
    evaluate(node, context);
}

function loadPlugin(plugin: Plugin, context: Context): Context {
    const contextWithFunctions = plugin.functions.reduce((context, func) => loadPluginFunction(func, context), context);
    const contextWithConstants = plugin.constants.reduce(
        (context, constant) => loadPluginConstant(constant, context),
        contextWithFunctions,
    );

    return contextWithConstants;

    //plugin.inlineDefinitions.forEach((inlineDefinition) => loadPluginInlineDefinition(inlineDefinition, context));
}

interface LoadPluginsResult {
    context: Context;
    log: string[];
}

export default function loadPlugins(plugins: Plugin[], options: Options): LoadPluginsResult {
    const log: string[] = [];
    const excludedPlugins: string[] = [];
    let loadingErrorOccured = true;
    let context: Context;

    while (loadingErrorOccured) {
        log.push(excludedPlugins.length === 0 ? 'initialize empty stack' : 'reset stack');
        loadingErrorOccured = false;
        context = {
            options,
            stack: [{}],
        };

        plugins
            .filter((plugin) => !excludedPlugins.includes(plugin.name))
            .forEach((plugin) => {
                try {
                    context = loadPlugin(plugin, context);
                } catch (loadingError) {
                    loadingErrorOccured = true;
                    excludedPlugins.push(plugin.name);
                    log.push(`Failed to load plugin ${plugin.name}: ${loadingError}`);
                }
            });
    }
    log.push(`loading completed excluded plugins: [${excludedPlugins.join(', ')}]`);
    return { context, log };
}
