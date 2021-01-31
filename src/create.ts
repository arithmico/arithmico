import {
    Add,
    Boolean,
    Definition,
    Div,
    Equal,
    FunctionCall,
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual,
    Mul,
    Not,
    Number,
    Pow,
    Sub,
    Symbol,
    SyntaxTreeNode,
    Vector
} from "types";

// data structures
export const createNumber = (value: number): Number => {
    return {
        type: "Number",
        value
    };
};

export const createSymbol = (name: string): Symbol => {
    return {
        type: "Symbol",
        name
    };
};

export const createBoolean = (value: boolean): Boolean => {
    return {
        type: "Boolean",
        value
    };
};

export const createVector = (children: SyntaxTreeNode[]): Vector => {
    return {
        type: "Vector",
        children,
    };
};

// unary operators
export const createNot = (child: SyntaxTreeNode): Not => {
    return {
        type: "Not",
        child
    };
};

// binary operators
export const createAdd = (left: SyntaxTreeNode, right: SyntaxTreeNode): Add => {
    return {
        type: "Add",
        children: [left, right]
    };
};

export const createSub = (left: SyntaxTreeNode, right: SyntaxTreeNode): Sub => {
    return {
        type: "Sub",
        children: [left, right]
    };
};

export const createMul = (left: SyntaxTreeNode, right: SyntaxTreeNode): Mul => {
    return {
        type: "Mul",
        children: [left, right]
    };
};

export const createDiv = (left: SyntaxTreeNode, right: SyntaxTreeNode): Div => {
    return {
        type: "Div",
        children: [left, right]
    };
};

export const createPow = (left: SyntaxTreeNode, right: SyntaxTreeNode): Pow => {
    return {
        type: "Pow",
        children: [left, right]
    };
};

export const createEqual = (left: SyntaxTreeNode, right: SyntaxTreeNode): Equal => {
    return {
        type: "Equal",
        children: [left, right]
    };
};

export const createDefinition = (left: SyntaxTreeNode, right: SyntaxTreeNode): Definition => {
    return {
        type: "Definition",
        children: [left, right]
    };
};

export const createGreaterThan = (left: SyntaxTreeNode, right: SyntaxTreeNode): GreaterThan => {
    return {
        type: "GreaterThan",
        children: [left, right]
    };
};

export const createGreaterThanOrEqual = (left: SyntaxTreeNode, right: SyntaxTreeNode): GreaterThanOrEqual => {
    return {
        type: "GreaterThanOrEqual",
        children: [left, right]
    };
};

export const createLessThan = (left: SyntaxTreeNode, right: SyntaxTreeNode): LessThan => {
    return {
        type: "LessThan",
        children: [left, right]
    };
};

export const createLessThanOrEqual = (left: SyntaxTreeNode, right: SyntaxTreeNode): LessThanOrEqual => {
    return {
        type: "LessThanOrEqual",
        children: [left, right]
    };
};

// other
export const createFunctionCall = (name: string, children: SyntaxTreeNode[]): FunctionCall => {
    return {
        type: "FunctionCall",
        name,
        children
    };
};