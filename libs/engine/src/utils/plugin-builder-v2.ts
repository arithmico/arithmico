import createFunctionCall from '../create/create-function-call';
import createSymbolNode from '../create/create-symbol-node';
import {
    Context,
    FunctionHeaderItem,
    FunctionNode,
    Plugin,
    PluginConstant,
    PluginFunction,
    SymbolNode,
    SyntaxTreeNode,
} from '../types';
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
    getParameter(name: string, fallback?: SyntaxTreeNode): SyntaxTreeNode | SyntaxTreeNode[];
    getNullableParameter(name: string): SyntaxTreeNode | SyntaxTreeNode[] | null;
    runtimeError(message: string): void;
    typeError(message: string): void;
    context: Context;
}

export class PluginFragment {
    protected constants: PluginConstant[];
    protected functions: PluginFunction[];

    constructor() {
        this.constants = [];
        this.functions = [];
    }

    getConstants() {
        return this.constants;
    }

    getFunctions() {
        return this.functions;
    }

    addFragment(fragment: PluginFragment) {
        this.functions = this.functions.concat(fragment.getFunctions());
        this.constants = this.constants.concat(fragment.getConstants());
        return this;
    }

    addConstant(
        name: string,
        descriptionEn: string,
        descriptionDe: string,
        value: Exclude<SyntaxTreeNode, FunctionNode>,
    ) {
        this.constants.push({
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
    ) {
        const headerSymbols = convertHeaderToSymbolList(header);
        const synopsis = `${name}(${headerSymbols.map((symbol) => symbol.name).join(', ')})`;
        const expression = createFunctionCall(createSymbolNode(name), headerSymbols);

        this.functions.push({
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

                    const getNullableParameter = (name: string): SyntaxTreeNode | SyntaxTreeNode[] | null => {
                        const parameter = parameterMap.get(name);

                        if (parameter) {
                            return parameter;
                        }

                        return null;
                    };

                    const runtimeError = (message: string) => {
                        return `RuntimeError: ${name}: ${message}`;
                    };

                    const typeError = (message: string) => {
                        return `TypeError: ${name}: ${message}`;
                    };

                    return evaluator({ getParameter, getNullableParameter, runtimeError, typeError, context });
                },
            },
        });

        return this;
    }
}

class PluginBuilder extends PluginFragment {
    private name: string;
    private author: string;
    private description: string;

    constructor(name: string, author: string, description: string) {
        super();
        this.name = name;
        this.author = author;
        this.description = description;
    }

    build(): Plugin {
        return {
            name: this.name,
            author: this.author,
            description: this.description,
            constants: this.constants,
            functions: this.functions,
            inlineDefinitions: [],
        };
    }
}

export default function createPluginV2(name: string, author: string, description: string) {
    return new PluginBuilder(name, author, description);
}
