import { Plugin, PluginStructure, PluginStructureItem } from '../types';

function loadPluginStructure(plugin: Plugin): PluginStructure {
    const constants: PluginStructureItem[] = plugin.constants.map((constant) => ({
        type: 'constant',
        name: constant.name,
        synopsis: {
            en: constant.documentation.en.synopsis,
            de: constant.documentation.de.synopsis,
        },
        description: {
            en: constant.documentation.en.description,
            de: constant.documentation.de.description,
        },
    }));

    const functions: PluginStructureItem[] = plugin.functions.map((pluginFunction) => ({
        type: 'function',
        name: pluginFunction.name,
        synopsis: {
            en: pluginFunction.documentation.en.synopsis,
            de: pluginFunction.documentation.de.synopsis,
        },
        description: {
            en: pluginFunction.documentation.en.description,
            de: pluginFunction.documentation.de.description,
        },
    }));

    const methods: PluginStructureItem[] = plugin.methods.map((method) => ({
        type: 'method',
        name: method.name,
        synopsis: {
            en: method.documentation.en.synopsis,
            de: method.documentation.de.synopsis,
        },
        description: {
            en: method.documentation.en.description,
            de: method.documentation.de.description,
        },
    }));

    return {
        name: plugin.name,
        items: [...constants, ...functions, ...methods],
    };
}

export default function loadPluginStructures(plugins: Plugin[]): PluginStructure[] {
    return plugins.map(loadPluginStructure);
}
