import { PluginConstant, PluginFunction } from './../types/Plugin';
import { Plugin } from '../types/Plugin';

export function createPlugin(name: string): Plugin {
    return {
        name,
        author: '',
        description: '',
        constants: [],
        functions: [],
        inlineDefinitions: [],
    };
}

export function addPluginAuthor(plugin: Plugin, author: string): Plugin {
    return {
        ...plugin,
        author,
    };
}

export function addPluginDescription(plugin: Plugin, description: string): Plugin {
    return {
        ...plugin,
        description,
    };
}

export function addPluginConstant(plugin: Plugin, constant: PluginConstant): Plugin {
    return {
        ...plugin,
        constants: [...plugin.constants, constant],
    };
}

export function addPluginFunction(plugin: Plugin, func: PluginFunction): Plugin {
    return {
        ...plugin,
        functions: [...plugin.functions, func],
    };
}

export function addPluginInlineDefinition(plugin: Plugin, inlineDefinition: string): Plugin {
    return {
        ...plugin,
        inlineDefinitions: [...plugin.inlineDefinitions, inlineDefinition],
    };
}
