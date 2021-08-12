// abstract interfaces
interface AbstractSyntaxTreeNode {
    type: string
}

export interface AbstractBinaryOperatorNode extends AbstractSyntaxTreeNode {
    children: [SyntaxTreeNode, SyntaxTreeNode]
}

export interface AbstractUnaryOperatorNode extends AbstractSyntaxTreeNode {
    child: SyntaxTreeNode
}

// data structure nodes
export interface Symbol extends AbstractSyntaxTreeNode {
    type: "Symbol",
    name: string
}

export interface Number extends AbstractSyntaxTreeNode {
    type: "Number",
    value: number
}

export interface Boolean extends AbstractSyntaxTreeNode {
    type: "Boolean",
    value: boolean
}

export interface Vector extends AbstractSyntaxTreeNode {
    type: "Vector",
    children: SyntaxTreeNode[]
}

// non terminal nodes
export interface And extends AbstractBinaryOperatorNode {
    type: "And"
}

export interface Or extends AbstractBinaryOperatorNode {
    type: "Or"
}

export interface Add extends AbstractBinaryOperatorNode {
    type: "Add"
}

export interface Sub extends AbstractBinaryOperatorNode {
    type: "Sub"
}

export interface Mul extends AbstractBinaryOperatorNode {
    type: "Mul"
}

export interface Div extends AbstractBinaryOperatorNode {
    type: "Div"
}

export interface Pow extends AbstractBinaryOperatorNode {
    type: "Pow"
}

export interface Equal extends AbstractBinaryOperatorNode {
    type: "Equal"
}

export interface LessThan extends AbstractBinaryOperatorNode {
    type: "LessThan"
}

export interface GreaterThan extends AbstractBinaryOperatorNode {
    type: "GreaterThan"
}

export interface LessThanOrEqual extends AbstractBinaryOperatorNode {
    type: "LessThanOrEqual"
}

export interface GreaterThanOrEqual extends AbstractBinaryOperatorNode {
    type: "GreaterThanOrEqual"
}

export interface Definition extends AbstractBinaryOperatorNode {
    type: "Definition"
}

// unary operator nodes
export interface Not extends AbstractUnaryOperatorNode {
    type: "Not"
}

// other nodes
export interface FunctionCall extends AbstractSyntaxTreeNode {
    type: "FunctionCall",
    name: string,
    children: SyntaxTreeNode[]
}

export interface FunctionParameter {
    name: string,
    type: string
}

export interface FunctionSignature extends AbstractSyntaxTreeNode {
    type: "FunctionSignature",
    name: string,
    parameters: FunctionParameter[]
}

// node categories
export type SyntaxTreeNode = DatastructureNode
    | BinaryOperatorNode
    | UnaryOperatorNode
    | FunctionSignature
    | FunctionCall;

export type DatastructureNode = Symbol
    | Number
    | Boolean
    | Vector;

export type BinaryOperatorNode = Add
    | Mul
    | Pow
    | BooleanBinaryOperator
    | Relation
    | Definition;

export type BooleanBinaryOperator = And | Or;
export type PartialOrder = LessThan | GreaterThan | LessThanOrEqual | GreaterThanOrEqual;
export type Relation = Equal | PartialOrder

export type UnaryOperatorNode = Not;

// evaluation context
export interface Options {
    decimalPlaces: number,
    decimalSeparator: "." | ","
}

export interface ValueStackObject {
    type: "value",
    value: SyntaxTreeNode
}

export interface FunctionStackObject {
    type: "function",
    nonRecursiveEvaluation: boolean,
    evaluator: (parameters: SyntaxTreeNode[]) => SyntaxTreeNode
}

export type StackObject = ValueStackObject | FunctionStackObject;

export interface StackFrame {
    [key: string]: StackObject
}

export interface Context {
    options: Options,
    stack: StackFrame[]
}