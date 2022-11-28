import { Context } from 'vm';
import { SyntaxTreeNode, FunctionNode } from './SyntaxTreeNodes';

export interface GlobalDocumentationItem {
    type: 'constant' | 'function';
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
    evaluator: (node: T, context: Context) => SyntaxTreeNode;
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
