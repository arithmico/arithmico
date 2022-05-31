import { SyntaxTreeNode } from './SyntaxTreeNodes';

export interface Options {
    decimalPlaces: number;
    decimalSeparator: '.' | ',';
    magnitudeThresholdForScientificNotation: number;
    angleUnit: 'degrees' | 'radians';
}
export interface StackFrame {
    [key: string]: SyntaxTreeNode;
}

export interface Context {
    options: Options;
    stack: StackFrame[];
}
