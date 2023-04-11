import { PluginMethod } from './plugin.types';
import { SyntaxTreeNode } from './nodes.types';

export interface Options {
    decimalPlaces: number;
    decimalSeparator: '.' | ',';
    magnitudeThresholdForScientificNotation: number;
    angleUnit: 'degrees' | 'radians';
    operators: {
        [key: string]: boolean;
    };
}

export type StackFrame = Map<string, SyntaxTreeNode>;

export interface Context {
    options: Options;
    methods: Map<SyntaxTreeNode['type'], Map<string, PluginMethod<SyntaxTreeNode>['evaluator']>>;
    stack: StackFrame[];
}

declare global {
    const __OPERATORS: {
        [key: string]: boolean;
    };
    const __OBJECTS: {
        [key: string]: boolean;
    };
    const __FUNCTIONS: {
        [key: string]: boolean;
    };
    const __METHODS: {
        [key: string]: boolean;
    };
    const __CONSTANTS: {
        [key: string]: boolean;
    };
}
