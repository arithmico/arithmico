import { PluginConstant, PluginFunction } from './../types/Plugin';
import { Plugin } from '../types/Plugin';
import { FunctionHeaderItem, FunctionNode, SymbolNode } from '../types/SyntaxTreeNodes';
import createFunctionCall from '../create/FunctionCall';
import createSymbolNode from '../create/SymbolNode';

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

function convertHeaderToSymbolList(header: FunctionHeaderItem[]): SymbolNode[] {
    const result: SymbolNode[] = [];

    header.forEach((item) => {
        if (item.optional) {
            result.push(createSymbolNode(item.name + '?'));
        } else {
            result.push(createSymbolNode(item.name));
        }

        if (item.repeat) {
            result.push(createSymbolNode('...'));
        }
    });

    return result;
}

export function createPluginFunction(
    name: string,
    header: FunctionHeaderItem[],
    description: string,
    evaluator: FunctionNode['evaluator'],
): PluginFunction {
    const headerSymbols = convertHeaderToSymbolList(header);
    const synopsis = `${name}(${headerSymbols.map((symbol) => symbol.name).join(', ')})`;
    const expression = createFunctionCall(createSymbolNode(name), headerSymbols);

    return {
        name,
        documentation: {
            en: {
                synopsis,
                description,
            },
        },
        function: {
            type: 'function',
            header,
            expression,
            evaluator,
        },
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
