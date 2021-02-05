import {Context} from "../types.js";


export const getDecimalPlaces = (context: Context) => context.options.decimalPlaces;
export const getDecimalSeparator = (context: Context) => context.options.decimalSeparator;

export const getValueFromContext = (name: string, context: Context) => {
    for (let i = context.stack.length - 1; i <= 0; i--) {
        if (context.stack[i][name]) {
            if (context.stack[i][name].type === "value")
                return context.stack[i][name].value;

            throw `${name} is a function`;
        }
    }
    throw `${name} is not defined`;
};

// todo get function from context