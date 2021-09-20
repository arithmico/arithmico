import {Context, FunctionStackObject, StackObject, SyntaxTreeNode, ValueStackObject} from "../types.js";

export const getDecimalPlaces = (context: Context) => context.options.decimalPlaces;
export const getDecimalSeparator = (context: Context) => context.options.decimalSeparator;

export const addValueToContext = (context: Context, name: string, stackObject: StackObject, force = false) => {
    if (context.stack.length === 0) {
        context.stack.push({
            [name]: stackObject
        });
    } else {
        if (!force && context.stack[context.stack.length - 1][name])
            throw `An object with the name "${name}" already exists.`

        context.stack[context.stack.length - 1][name] = stackObject;
    }
};

export const createValueStackObject = (value: SyntaxTreeNode): ValueStackObject => {
    return {
        type: "value",
        value
    }
}

export const createFunctionStackObject = (evaluator: FunctionStackObject["evaluator"], nonRecursiveEvaluation = false): FunctionStackObject => {
    return {
        type: "function",
        evaluator,
        nonRecursiveEvaluation
    };
}

export const getValueFromContext = (name: string, context: Context) => {
    for (let i = context.stack.length - 1; i >= 0; i--) {
        if (context.stack[i][name]) {
            if (context.stack[i][name].type === "value")
                return (context.stack[i][name] as ValueStackObject).value;

            throw `${name} is a function`;
        }
    }
    throw `${name} is not defined`;
};

export const getFunctionFromContext = (name: string, context: Context) => {
    for (let i = context.stack.length - 1; i >= 0; i--) {
        if (context.stack[i][name]) {
            if (context.stack[i][name].type === "function")
                return (context.stack[i][name] as FunctionStackObject);

            throw `${name} is not a function`;
        }
    }
    throw `${name} is not defined`;
}