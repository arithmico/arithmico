import { Plugin } from '../types';

interface PluginItemStructure {
    name: string;
    synopsis: string;
    description: {
        [key: string]: string;
    };
}

export interface PluginStructure {
    name: string;
    items: PluginItemStructure[];
}

export default function loadPluginStructures(plugins: Plugin[]): PluginStructure[] {
    return plugins.map((plugin) => ({
        name: plugin.name,
        items: [
            ...plugin.constants.map((pluginConstant) => ({
                name: pluginConstant.name,
                synopsis: pluginConstant.documentation.en.synopsis,
                description: {
                    en: pluginConstant.documentation.en.description,
                },
            })),
            ...plugin.functions.map((pluginFunction) => ({
                name: pluginFunction.name,
                synopsis: pluginFunction.documentation.en.synopsis,
                description: {
                    en: pluginFunction.documentation.en.description,
                },
            })),
        ],
    }));
}
