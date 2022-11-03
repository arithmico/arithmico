import { Plugin, Profile, GlobalDocumentationItem, Context } from '../types';
import { createContextWithOptions } from '../utils/context-utils';
import loadDocumentationFromPlugin from './load-documentation';
import loadPlugin from './load-plugin';

export default function load(plugins: Plugin[], profile: Profile): [Context, GlobalDocumentationItem[], string[]] {
    const logs: string[] = [];
    const context = createContextWithOptions(profile.options);
    const docs: GlobalDocumentationItem[] = [];

    const contextWithLoadedPlugins = plugins.reduce((context, plugin) => {
        // do not load faulty plugins
        try {
            const newContext = loadPlugin(plugin, context, profile);
            const pluginDocs = loadDocumentationFromPlugin(plugin, profile);
            pluginDocs.forEach((docItem) => docs.push(docItem));
            return newContext;
        } catch (errorMessage) {
            logs.push(`LoadingError: Failed to load plugin "${plugin.name}"\n${errorMessage}`);
            return context;
        }
    }, context);

    contextWithLoadedPlugins.stack.push(new Map());

    return [contextWithLoadedPlugins, docs, logs];
}
