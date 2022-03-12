import { SyntaxTreeNode } from "./SyntaxTreeNodes"

export interface Options {
    decimalPlaces: number,
    decimalSeparator: "." | ",",
    magnitudeThresholdForScientificNotation: number
}

export type StackObject = ValueStackObject | FunctionStackObject;
export interface ValueStackObject {
    type: "value",
    value: SyntaxTreeNode
}

export interface FunctionStackObject {
    type: "function",
    evaluateParametersBefore: boolean,
    evaluator: (parameters: SyntaxTreeNode[], context: Context) => SyntaxTreeNode
}

export interface StackFrame {
    [key: string]: StackObject
}

export interface Context {
    options: Options,
    stack: StackFrame[]
}