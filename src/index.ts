import {Context} from "./types.js";
import evaluateRaw from "./eval/evaluate.js";
import {serialize as serializeNode} from "./serialize";
import {parse as parseAndTransform} from "./parse/index.js";

const defaultContext: Context = {
    options: {
        decimalSeparator: ".",
        decimalPlaces: 6,
        magnitudeThresholdForScientificNotation: 4
    },
    stack: []
};

export const parse = parseAndTransform;

export const serialize = serializeNode;

export const evaluateWithoutSerializing = (input: string, context: Context = defaultContext) => evaluateRaw(
    parseAndTransform(input), context
);

export const evaluateNode = evaluateRaw;
export const evaluate = (input: string, context: Context = defaultContext) => serializeNode(
    evaluateWithoutSerializing(input, context), context.options
);