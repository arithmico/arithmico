import createFunctionCall from '../node-operations/create-node/create-function-call';
import createSymbolNode from '../node-operations/create-node/create-symbol-node';
import {
    FunctionHeaderItem,
    FunctionNode,
    Plugin,
    PluginConstant,
    PluginFunction,
    PluginFunctionProps,
    PluginMethod,
    PluginMethodProps,
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

function createErrorFunctions(name: string) {
    return {
        runtimeError: (message: string) => {
            return `RuntimeError: ${name}: ${message}`;
        },
        typeError: (message: string) => {
            return `TypeError: ${name}: ${message}`;
        },
    };
}

function createGetParameterFunctions(name: string, parameterMap: ReturnType<typeof getParameterMap>) {
    return {
        getParameter: (name: string, fallback?: SyntaxTreeNode) => {
            const parameter = parameterMap.get(name);

            if (!parameter && !fallback) {
                throw `RuntimeError: ${name}: No parameter fallback available`;
            }

            if (!parameter) {
                return fallback;
            }

            return parameter;
        },
        getNullableParameter: (name: string): SyntaxTreeNode | SyntaxTreeNode[] | null => {
            const parameter = parameterMap.get(name);

            if (parameter) {
                return parameter;
            }

            return null;
        },
    };
}

export class PluginFragment {
    protected constants: PluginConstant[];
    protected functions: PluginFunction[];
    protected methods: PluginMethod<SyntaxTreeNode>[];

    constructor() {
        this.constants = [];
        this.functions = [];
        this.methods = [];
    }

    getConstants() {
        return this.constants;
    }

    getFunctions() {
        return this.functions;
    }

    getMethods() {
        return this.methods;
    }

    addMethod<T extends SyntaxTreeNode>(
        name: string,
        target: SyntaxTreeNode['type'],
        header: FunctionHeaderItem[],
        descriptionEn: string,
        descriptionDe: string,
        evaluator: (props: PluginMethodProps<T>) => SyntaxTreeNode,
    ) {
        const synopsis = `<${target}>.${name}(${convertHeaderToSymbolList(header)})`;

        this.methods.push({
            name,
            targetType: target,
            evaluator: (...args: Parameters<PluginMethod<T>['evaluator']>) => {
                const [node, parameters, context] = args;
                const parameterMap = getParameterMap(name, parameters, header, context);

                const { getNullableParameter, getParameter } = createGetParameterFunctions(name, parameterMap);
                const { runtimeError, typeError } = createErrorFunctions(name);

                return evaluator({ getParameter, getNullableParameter, runtimeError, typeError, node, context });
            },
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
        });

        return this;
    }

    addFragment(fragment: PluginFragment) {
        this.functions = this.functions.concat(fragment.getFunctions());
        this.constants = this.constants.concat(fragment.getConstants());
        this.methods = this.methods.concat(fragment.methods);
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
                    const { getNullableParameter, getParameter } = createGetParameterFunctions(name, parameterMap);
                    const { runtimeError, typeError } = createErrorFunctions(name);
                    return evaluator({ getParameter, getNullableParameter, runtimeError, typeError, context });
                },
            },
        });

        return this;
    }
}

class PluginBuilder extends PluginFragment {
    private readonly name: string;
    private readonly author: string;
    private readonly description: string;

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
            methods: this.methods,
            inlineDefinitions: [],
        };
    }
}

export default function createPlugin(name: string, author: string, description: string) {
    return new PluginBuilder(name, author, description);
}
