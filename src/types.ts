// abstract interfaces
interface AbstractSyntaxTreeNode {
    type: string
}

interface AbstractBinaryOperatorNode extends AbstractSyntaxTreeNode {
    children: [SyntaxTreeNode, SyntaxTreeNode]
}

interface AbstractUnaryOperatorNode extends AbstractSyntaxTreeNode {
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

// node categories
export type SyntaxTreeNode = DatastructureNode
    | BinaryOperatorNode
    | UnaryOperatorNode
    | FunctionCall;

export type DatastructureNode = Symbol
    | Number
    | Boolean
    | Vector;

export type BinaryOperatorNode = Add
    | Sub
    | Mul
    | Div
    | Pow
    | Equal
    | LessThan
    | GreaterThan
    | LessThanOrEqual
    | GreaterThanOrEqual
    | Definition;

export type UnaryOperatorNode = Not;