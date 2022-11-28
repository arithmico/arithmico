import { SyntaxTreeNode } from './SyntaxTreeNodes';

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
    methods: Map<SyntaxTreeNode['type'], Map<string, (node: SyntaxTreeNode, context: Context) => SyntaxTreeNode>>;
    stack: StackFrame[];
}
