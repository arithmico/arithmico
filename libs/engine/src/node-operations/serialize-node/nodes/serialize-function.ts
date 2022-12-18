import { Options } from '../../../types/Context';
import serialize, { needsBrackets } from '..';
import { FunctionNode } from '../../../types';
import { FunctionHeaderItem } from '../../../types/SyntaxTreeNodes';

export function serializeHeaderItem(item: FunctionHeaderItem) {
    const suffix = ((optional: boolean, repeat: boolean) => {
        if (optional && repeat) return '*';
        if (!optional && repeat) return '+';
        if (optional && !repeat) return '?';
        if (!optional && !repeat) return '';
    })(item.optional, item.repeat);

    return `${item.name}: ${item.type}${suffix}`;
}

export default function serializeFunction(node: FunctionNode, options: Options) {
    const serializedChild = needsBrackets(node.type, node.expression.type, true)
        ? `${serialize(node.expression, options)}`
        : serialize(node.expression, options);

    return `(${node.header
        .map(serializeHeaderItem)
        .join(options.decimalSeparator === '.' ? ', ' : '; ')}) → ${serializedChild}`;
}
