import { parse } from './parse/parser';
import evaluateNode from './eval';
import serialize from './serialize';
import { Context } from './types';

const defaultContext: Context = {
    options: {
        decimalPlaces: 6,
        decimalSeparator: '.',
        magnitudeThresholdForScientificNotation: 6,
    },
    stack: [{}],
};

export default function evaluate(input: string, context: Context = defaultContext): string {
    let nodeTree;

    try {
        nodeTree = parse(input);
    } catch (syntaxError) {
        throw syntaxError.message;
    }

    return serialize(evaluateNode(nodeTree, context), context.options);
}
