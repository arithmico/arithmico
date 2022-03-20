import { Context, Plugin, SyntaxTreeNode, PluginFunction, PluginConstant, Options } from '../types';
import { insertStackObject, useStrictContextValidator } from './context-utils';
import { parse } from '../parse/parser';
import evaluate from '../eval';

function loadPluginFunction(pluginFunction: PluginFunction, context: Context) {
    insertStackObject(
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

function loadPluginConstant(pluginConstant: PluginConstant, context: Context) {
    insertStackObject(
        pluginConstant.name,
        {
            type: 'value',
            value: pluginConstant.value,
        },
        context,
    );
}

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

function loadPlugin(plugin: Plugin, context: Context) {
    plugin.functions.forEach((func) => loadPluginFunction(func, context));
    plugin.constants.forEach((constant) => loadPluginConstant(constant, context));
    plugin.inlineDefinitions.forEach((inlineDefinition) => loadPluginInlineDefinition(inlineDefinition, context));
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
        loadingErrorOccured = false;
        context = {
            options,
            stack: [{}],
        };

        plugins
            .filter((plugin) => !excludedPlugins.includes(plugin.name))
            .forEach((plugin) => {
                try {
                    loadPlugin(plugin, context);
                } catch (loadingError) {
                    loadingErrorOccured = true;
                    excludedPlugins.push(plugin.name);
                    log.push(`Failed to load plugin ${plugin.name}: ${loadingError}`);
                }
            });
    }

    return { context, log };
}
