import { Context } from './context.types';
import { SyntaxTreeNode, FunctionNode } from './nodes.types';

export interface PluginStructureItem {
    type: 'function' | 'constant' | 'method';
    enabled: boolean;
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
    items: PluginStructureItem[];
}

interface Documentation {
    synopsis: string;
    description: string;
}

export type Language = 'en' | 'de';

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
    node: T;
}

export interface Plugin {
    name: {
        [key in Language]: string;
    };
    description: {
        [key in Language]?: string;
    };
    author: string;
    functions: PluginFunction[];
    constants: PluginConstant[];
    methods: PluginMethod<SyntaxTreeNode>[];
}
