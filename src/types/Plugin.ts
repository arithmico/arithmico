import { Context } from './Context';
import { SyntaxTreeNode } from './SyntaxTreeNodes';

interface Documentation {
    synopsis: string;
    description: string;
}

type Language = 'en' | 'de';

export interface PluginFunction {
    name: string;
    parameterValidator: (parameters: SyntaxTreeNode[]) => void;
    evaluator: (parameters: SyntaxTreeNode[], context: Context) => SyntaxTreeNode;
    documentation: {
        [key in Language]?: Documentation;
    };
}

export interface PluginConstant {
    name: string;
    value: SyntaxTreeNode;
    documentation: {
        [key in Language]?: Documentation;
    };
}

export interface Plugin {
    name: string;
    description: string;
    author: string;
    functions: PluginFunction[];
    constants: PluginConstant[];
    inlineDefinitions: string[];
}
