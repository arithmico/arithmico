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
    plugin.author = author;
}

export function addPluginDescription(plugin: Plugin, description: string) {
    plugin.description = description;
}

export function addPluginConstant(plugin: Plugin, constant: PluginConstant) {
    plugin.constants = [...plugin.constants, constant];
}

export function addPluginFunction(plugin: Plugin, func: PluginFunction) {
    plugin.functions = [...plugin.functions, func];
}

export function addPluginInlineDefinition(plugin: Plugin, inlineDefinition: string) {
    plugin.inlineDefinitions = [...plugin.inlineDefinitions, inlineDefinition];
}
