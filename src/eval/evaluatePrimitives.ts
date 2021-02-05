import {Boolean, Context, Number, Symbol} from "../types.js";
import {getValueFromContext} from "../utils/contextUtils.js";

export const evaluateNumber = (node: Number) => node;
export const evaluateSymbol = (node: Symbol, context: Context) => getValueFromContext(node.name, context);
export const evaluateBoolean = (node: Boolean) => node;