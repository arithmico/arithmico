import {Context, FunctionStackObject, ValueStackObject} from "../types.js";

export const getDecimalPlaces = (context: Context) => context.options.decimalPlaces;
export const getDecimalSeparator = (context: Context) => context.options.decimalSeparator;

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
                return (context.stack[i][name] as FunctionStackObject).evaluator;

            throw `${name} is not a function`;
        }
    }
    throw `${name} is not defined`;
}