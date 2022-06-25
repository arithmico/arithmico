import { GlobalDocumentationItem } from './../types/Plugin';
import { Context, Plugin, PluginFunction, PluginConstant, Options } from '../types';
import { insertStackObject } from './context-utils';

function loadPluginFunction(pluginFunction: PluginFunction, context: Context): Context {
    return insertStackObject(pluginFunction.name, pluginFunction.function, context);
}

function loadPluginConstant(pluginConstant: PluginConstant, context: Context): Context {
    return insertStackObject(pluginConstant.name, pluginConstant.value, context);
}

function loadPlugin(plugin: Plugin, context: Context): Context {
    const contextWithFunctions = plugin.functions
        .filter((func) => {
            if (context.options.config.load.mode === 'blacklist') {
                return !context.options.config.load.names.includes(func.name);
            } else {
                return !context.options.config.load.names.includes(func.name);
            }
        })
        .reduce((context, func) => loadPluginFunction(func, context), context);

    const contextWithConstants = plugin.constants
        .filter((constant) => {
            if (context.options.config.load.mode === 'blacklist') {
                return !context.options.config.load.names.includes(constant.name);
            } else {
                return !context.options.config.load.names.includes(constant.name);
            }
        })
        .reduce((context, constant) => loadPluginConstant(constant, context), contextWithFunctions);

    return contextWithConstants;
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
    context.stack.push({});
    return { context, log, documentation };
}
