import createFunctionCall from '../create/create-function-call';
import createSymbolNode from '../create/create-symbol-node';
import { Context, FunctionHeaderItem, FunctionNode, Plugin, SymbolNode, SyntaxTreeNode } from '../types';
import { getParameterMap } from './parameter-utils';

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

interface PluginFunctionProps {
    getParameter(name: string): SyntaxTreeNode | SyntaxTreeNode[];
    runtimeError(message: string): void;
    typeError(message: string): void;
    context: Context;
}

class PluginBuilderV2 {
    private plugin: Plugin;

    constructor() {
        this.plugin = {
            name: '',
            author: '',
            description: '',
            constants: [],
            functions: [],
            inlineDefinitions: [],
        };
    }

    withName(name: string): PluginBuilderV2 {
        if (name.length < 1) {
            throw 'invalid name';
        }

        if (this.plugin.name.length > 0) {
            throw 'name is already set';
        }

        this.plugin.name = name;

        return this;
    }

    withAuthor(author: string): PluginBuilderV2 {
        if (author.length < 1) {
            throw 'invalid author';
        }

        if (this.plugin.author.length > 0) {
            throw 'author is already set';
        }

        this.plugin.author = author;

        return this;
    }

    withDescription(description: string): PluginBuilderV2 {
        if (description.length < 1) {
            throw 'invalid description';
        }

        if (this.plugin.description.length > 0) {
            throw 'description is already set';
        }

        this.plugin.description = description;

        return this;
    }

    addConstant(
        name: string,
        descriptionEn: string,
        descriptionDe: string,
        value: Exclude<SyntaxTreeNode, FunctionNode>,
    ): PluginBuilderV2 {
        this.plugin.constants.push({
            name,
            value,
            documentation: {
                en: {
                    synopsis: name,
                    description: descriptionEn,
                },
                de: {
                    synopsis: name,
                    description: descriptionDe,
                },
            },
        });

        return this;
    }

    addFunction(
        name: string,
        header: FunctionHeaderItem[],
        descriptionEn: string,
        descriptionDe: string,
        evaluator: (props: PluginFunctionProps) => SyntaxTreeNode,
    ): PluginBuilderV2 {
        const headerSymbols = convertHeaderToSymbolList(header);
        const synopsis = `${name}(${headerSymbols.map((symbol) => symbol.name).join(', ')})`;
        const expression = createFunctionCall(createSymbolNode(name), headerSymbols);

        this.plugin.functions.push({
            name,
            documentation: {
                en: {
                    synopsis,
                    description: descriptionEn,
                },
                de: {
                    synopsis: synopsis.replace(',', ';').replace('.', ','),
                    description: descriptionDe,
                },
            },
            function: {
                type: 'function',
                expression,
                header,
                evaluator: (parameters, context) => {
                    const parameterMap = getParameterMap(name, parameters, header, context);
                    const getParameter = (name: string, fallback?: SyntaxTreeNode) => {
                        const parameter = parameterMap.get(name);

                        if (!parameter && !fallback) {
                            throw `RuntimeError: ${name}: No parameter fallback available`;
                        }

                        if (!parameter) {
                            return fallback;
                        }

                        return parameter;
                    };

                    const runtimeError = (message: string) => {
                        return `RuntimeError: ${name}: ${message}`;
                    };

                    const typeError = (message: string) => {
                        return `TypeError: ${name}: ${message}`;
                    };

                    return evaluator({ getParameter, runtimeError, typeError, context });
                },
            },
        });

        return this;
    }

    build(): Plugin {
        if (!this.plugin.name) {
            throw 'no plugin name specified';
        }

        if (!this.plugin.author) {
            throw 'no plugin author specified';
        }

        if (!this.plugin.description) {
            throw 'no plugin description specified';
        }

        return this.plugin;
    }
}

export default function createPluginV2() {
    return new PluginBuilderV2();
}
