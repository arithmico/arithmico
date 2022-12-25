import { Plugin, Profile } from '../types';
import { createContextWithOptions } from '../utils/context-utils';
import loadPlugin from './load-plugin';
import loadPluginStructures from './load-plugin-structure';

export default function load(plugins: Plugin[], profile: Profile) {
    const context = createContextWithOptions(profile.options);
    const pluginStructure = loadPluginStructures(plugins, profile);

    const contextWithLoadedPlugins = plugins.reduce((context, plugin) => {
        try {
            return loadPlugin(plugin, context, profile);
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
