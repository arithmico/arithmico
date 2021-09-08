import {parse as parseRaw} from "./parser.js";
import {transform} from "./transform.js";

export const parse = (input: string) => transform(parseRaw(input));
