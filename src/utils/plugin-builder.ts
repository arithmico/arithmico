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

export function addPluginAuthor(plugin: Plugin, author: string) {
    plugin = {
        ...plugin,
        author,
    };
}

export function addPluginDescription(plugin: Plugin, description: string) {
    plugin = {
        ...plugin,
        description,
    };
}

export function addPluginConstant(plugin: Plugin, constant: PluginConstant) {
    plugin = {
        ...plugin,
        constants: [...plugin.constants, constant],
    };
}

export function addPluginFunction(plugin: Plugin, func: PluginFunction) {
    plugin = {
        ...plugin,
        functions: [...plugin.functions, func],
    };
}

export function addPluginInlineDefinition(plugin: Plugin, inlineDefinition: string) {
    plugin = {
        ...plugin,
        inlineDefinitions: [...plugin.inlineDefinitions, inlineDefinition],
    };
}
