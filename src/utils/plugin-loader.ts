import { GlobalDocumentationItem } from './../types/Plugin';
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
    return insertStackObject(pluginConstant.name, pluginConstant.value, context);
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

function loadPluginDocumentation(plugin: Plugin): GlobalDocumentationItem[] {
    const docs: GlobalDocumentationItem[] = [];
    plugin.functions.forEach((func) =>
        docs.push({
            plugin: plugin.name,
            type: 'function',
            documentation: func.documentation,
        }),
    );
    plugin.constants.forEach((constant) =>
        docs.push({
            plugin: plugin.name,
            type: 'constant',
            documentation: constant.documentation,
        }),
    );
    // todo inline definitions
    return docs;
}

interface LoadPluginsResult {
    log: string[];
    context: Context;
    documentation: GlobalDocumentationItem[];
}

export default function loadPlugins(plugins: Plugin[], options: Options): LoadPluginsResult {
    const log: string[] = [];
    const excludedPlugins: string[] = [];
    let loadingErrorOccured = true;
    let context: Context;
    let documentation: GlobalDocumentationItem[];

    log.push('Loading plugins...');
    while (loadingErrorOccured) {
        log.push(excludedPlugins.length === 0 ? 'initialize empty stack' : 'reset stack');
        loadingErrorOccured = false;
        context = {
            options,
            stack: [{}],
        };
        documentation = [];

        plugins
            .filter((plugin) => !excludedPlugins.includes(plugin.name))
            .forEach((plugin) => {
                try {
                    context = loadPlugin(plugin, context);
                    documentation = [...documentation, ...loadPluginDocumentation(plugin)];
                    log.push(`Successfully loaded plugin ${plugin.name}`);
                } catch (loadingError) {
                    loadingErrorOccured = true;
                    excludedPlugins.push(plugin.name);
                    log.push(`Failed to load plugin ${plugin.name}: ${loadingError}`);
                }
            });
    }
    log.push(`Loading completed excluded plugins: [${excludedPlugins.join(', ')}]`);
    return { context, log, documentation };
}
