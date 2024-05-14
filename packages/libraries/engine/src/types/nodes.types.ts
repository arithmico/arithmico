import { Context } from './context.types';
import { GraphicNode } from './graphics.types';

export type SyntaxTreeNode =
    | Or
    | And
    | Equals
    | Less
    | Greater
    | LessOrEquals
    | GreaterOrEquals
    | Plus
    | Minus
    | Negate
    | Times
    | Divided
    | Power
    | FunctionCall
    | Vector
    | NumberNode
    | BooleanNode
    | SymbolNode
    | StringNode
    | FunctionNode
    | Lambda
    | Define
    | MethodCall
    | GraphicNode
    | Factorial;

export type BinarySyntaxTreeNode =
    | Or
    | And
    | Equals
    | Less
    | Greater
    | LessOrEquals
    | GreaterOrEquals
    | Plus
    | Minus
    | Times
    | Divided
    | Power;

export interface Define {
    type: 'define';
    name: string;
    value: SyntaxTreeNode;
}
export interface FunctionNode {
    type: 'function';
    header: FunctionHeaderItem[];
    expression: SyntaxTreeNode;
    evaluator: (parameters: SyntaxTreeNode[], context: Context) => SyntaxTreeNode;
}

export interface FunctionHeaderItem {
    type: SyntaxTreeNode['type'] | 'any';
    name: string;
    evaluate: boolean;
    repeat?: boolean;
    optional?: boolean;
}

export interface Lambda {
    type: 'lambda';
    header: FunctionHeaderItem[];
    expression: SyntaxTreeNode;
}

export interface Or {
    type: 'or';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface And {
    type: 'and';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Equals {
    type: 'equals';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Less {
    type: 'less';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Greater {
    type: 'greater';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface LessOrEquals {
    type: 'lessOrEquals';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface GreaterOrEquals {
    type: 'greaterOrEquals';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Plus {
    type: 'plus';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Minus {
    type: 'minus';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Negate {
    type: 'negate';
    value: SyntaxTreeNode;
}

export interface Times {
    type: 'times';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Divided {
    type: 'divided';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Power {
    type: 'power';
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface FunctionCall {
    type: 'functionCall';
    function: SyntaxTreeNode;
    parameters: SyntaxTreeNode[];
}

export interface Vector {
    type: 'vector';
    values: SyntaxTreeNode[];
}

export interface NumberNode {
    type: 'number';
    value: number;
}

export interface BooleanNode {
    type: 'boolean';
    value: boolean;
}

export interface SymbolNode {
    type: 'symbol';
    name: string;
}

export interface StringNode {
    type: 'string';
    value: string;
}

export interface MethodCall {
    type: 'methodCall';
    object: SyntaxTreeNode;
    method: string;
    parameters: SyntaxTreeNode[];
}

export interface Factorial {
    type: 'factorial';
    value: SyntaxTreeNode;
}
