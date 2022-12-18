import serialize, { needsBrackets } from '..';
import { Lambda, Options } from '../../types';
import { serializeHeaderItem } from './serialize-function';

export default function serializeLambda(node: Lambda, options: Options) {
    const serializedExpression = needsBrackets(node.type, node.expression.type, true)
        ? `${serialize(node.expression, options)}`
        : serialize(node.expression, options);

    return `(${node.header
        .map(serializeHeaderItem)
        .join(options.decimalSeparator === '.' ? ', ' : '; ')}) → ${serializedExpression}`;
}
