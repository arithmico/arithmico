import { Options, Plugin } from '../types';
import { createContextWithOptions } from '../utils/context-utils';
import loadPlugin from './load-plugin';
import loadPluginStructures from './load-plugin-structure';

export default function load(plugins: Plugin[], options: Options) {
    const context = createContextWithOptions(options);
    const pluginStructure = loadPluginStructures(plugins);

    const contextWithLoadedPlugins = plugins.reduce((context, plugin) => {
        try {
            return loadPlugin(plugin, context);
        } catch (errorMessage) {
            throw `LoadingError: Failed to load plugin "${plugin.name}"\n${errorMessage}`;
        }
    }, context);

    contextWithLoadedPlugins.stack.push(new Map());

    return {
        context: contextWithLoadedPlugins,
        documentation: pluginStructure,
    };
}
