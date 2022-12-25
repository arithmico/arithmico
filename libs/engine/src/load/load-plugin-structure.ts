import { Plugin, PluginStructure, PluginStructureItem, Profile } from '../types';
import { createOptions } from '../utils/context-utils';

type Element<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;

function loadPluginStructureItem(
    item: Element<Plugin['functions']> | Element<Plugin['constants']> | Element<Plugin['methods']>,
    profile: Profile,
): Omit<PluginStructureItem, 'type'> {
    return {
        name: item.name,
        enabled:
            (profile.loadingMode === 'whitelist' && profile.loadingList.includes(item.name)) ||
            (profile.loadingMode === 'blacklist' && !profile.loadingList.includes(item.name)),
        synopsis: {
            en: item.documentation.en.synopsis,
            de: item.documentation.de.synopsis,
        },
        description: {
            en: item.documentation.en.description,
            de: item.documentation.de.description,
        },
    };
}

function loadPluginStructure(plugin: Plugin, profile: Profile): PluginStructure {
    const constants: PluginStructureItem[] = plugin.constants.map((constant) => ({
        type: 'constant',
        ...loadPluginStructureItem(constant, profile),
    }));

    const functions: PluginStructureItem[] = plugin.functions.map((pluginFunction) => ({
        type: 'function',
        ...loadPluginStructureItem(pluginFunction, profile),
    }));

    const methods: PluginStructureItem[] = plugin.methods.map((method) => ({
        type: 'method',
        ...loadPluginStructureItem(method, profile),
    }));

    return {
        name: plugin.name,
        items: [...constants, ...functions, ...methods],
    };
}

const allowAllProfile: Profile = {
    loadingMode: 'blacklist',
    loadingList: [],
    options: createOptions(),
};

export default function loadPluginStructures(plugins: Plugin[], profile: Profile = allowAllProfile): PluginStructure[] {
    return plugins.map((plugin) => loadPluginStructure(plugin, profile));
}
