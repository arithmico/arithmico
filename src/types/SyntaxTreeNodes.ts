export type SyntaxTreeNode = DefineVariable
    | DefineFunction
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
    | Number 
    | Boolean 
    | Symbol;

export interface DefineVariable {
    type: "defineVariable";
    name: string;
    value: SyntaxTreeNode;
}

export interface DefineFunction {
    type: "defineFunction";
    name: string;
    parameters: Symbol[];
    value: SyntaxTreeNode;
}

export interface Or {
    type: "or";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface And {
    type: "and";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Equals {
    type: "equals";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Less {
    type: "less";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Greater {
    type: "greater";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface LessOrEquals {
    type: "lessOrEquals";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface GreaterOrEquals {
    type: "greaterOrEquals";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Plus {
    type: "plus";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Minus {
    type: "minus";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}
    
export interface Negate {
    type: "negate";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Times {
    type: "times";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Divided {
    type: "divided";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface Power {
    type: "power";
    left: SyntaxTreeNode;
    right: SyntaxTreeNode;
}

export interface FunctionCall {
    type: "functionCall";
    name: string;
    parameters: SyntaxTreeNode[];
}

export interface Vector {
    type: "vector";
    values: SyntaxTreeNode[];
}

export interface Number {
    type: "number";
    value: number;
};

export interface Boolean {
    type: "boolean";
    value: number;
};

export interface Symbol {
    type: "symbol";
    name: string;
}
