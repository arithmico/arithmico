import { Language, Plugin } from '../types';

interface PluginItemStructure {
    type: 'function' | 'constant' | 'method';
    name: string;
    synopsis: {
        [key in Language]: string;
    };
    description: {
        [key in Language]?: string;
    };
}

export interface PluginStructure {
    name: {
        [key in Language]: string;
    };
    items: PluginItemStructure[];
}

function loadPluginStructure(plugin: Plugin): PluginStructure {
    const constants: PluginItemStructure[] = plugin.constants.map((constant) => ({
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

    const functions: PluginItemStructure[] = plugin.functions.map((pluginFunction) => ({
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

    const methods: PluginItemStructure[] = plugin.methods.map((method) => ({
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
