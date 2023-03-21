import { Plugin, PluginStructure, PluginStructureItem } from '../types';

type Element<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;

function loadPluginStructureItem(
    item: Element<Plugin['functions']> | Element<Plugin['constants']> | Element<Plugin['methods']>,
): Omit<PluginStructureItem, 'type'> {
    return {
        name: item.name,
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

function loadPluginStructure(plugin: Plugin): PluginStructure {
    const constants: PluginStructureItem[] = plugin.constants.map((constant) => ({
        type: 'constant',
        ...loadPluginStructureItem(constant),
    }));

    const functions: PluginStructureItem[] = plugin.functions.map((pluginFunction) => ({
        type: 'function',
        ...loadPluginStructureItem(pluginFunction),
    }));

    const methods: PluginStructureItem[] = plugin.methods.map((method) => ({
        type: 'method',
        ...loadPluginStructureItem(method),
    }));

    return {
        name: plugin.name,
        items: [...constants, ...functions, ...methods],
    };
}

export default function loadPluginStructures(plugins: Plugin[]): PluginStructure[] {
    return plugins.map((plugin) => loadPluginStructure(plugin));
}
