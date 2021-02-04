import {Number, Symbol, Boolean} from "../types.js";

export const evaluateNumber = (node: Number) => node;
export const evaluateSymbol = (node: Symbol) => node;
export const evaluateBoolean = (node: Boolean) => node;