import { Context } from './Context';
import { SyntaxTreeNode, FunctionNode } from './SyntaxTreeNodes';

export interface GlobalDocumentationItem {
    type: 'constant' | 'function' | 'method';
    plugin: string;
    documentation: {
        [key in Language]?: Documentation;
    };
}
interface Documentation {
    synopsis: string;
    description: string;
}

type Language = 'en' | 'de';

export interface PluginFunction {
    name: string;
    function: FunctionNode;
    documentation: {
        [key in Language]?: Documentation;
    };
}

export interface PluginFunctionProps {
    getParameter(name: string, fallback?: SyntaxTreeNode): SyntaxTreeNode | SyntaxTreeNode[];
    getNullableParameter(name: string): SyntaxTreeNode | SyntaxTreeNode[] | null;
    runtimeError(message: string): string;
    typeError(message: string): string;
    context: Context;
}

export interface PluginConstant {
    name: string;
    value: Exclude<SyntaxTreeNode, FunctionNode>;
    documentation: {
        [key in Language]?: Documentation;
    };
}

export interface PluginMethod<T extends SyntaxTreeNode> {
    name: string;
    targetType: T['type'];
    evaluator: (node: T, parameters: SyntaxTreeNode[], context: Context) => SyntaxTreeNode;
    documentation: {
        [key in Language]?: Documentation;
    };
}

export interface PluginMethodProps<T extends SyntaxTreeNode> extends PluginFunctionProps {
    getNode: () => T;
}

export interface Plugin {
    name: string;
    description: string;
    author: string;
    functions: PluginFunction[];
    constants: PluginConstant[];
    methods: PluginMethod<SyntaxTreeNode>[];
    inlineDefinitions: string[];
}
