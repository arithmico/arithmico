import { FunctionHeaderItem } from './../../types/SyntaxTreeNodes';
import { Context } from './../../types/Context';
import { StackFrame } from '../../types/Context';
import evaluate from '..';
import { SyntaxTreeNode, Lambda } from '../../types';
import createFunction from '../../create/Function';
import { mapParametersToStackFrame } from '../../utils/parameter-utils';
import serialize from '../../serialize';

function serializeHeaderItem(item: FunctionHeaderItem) {
    const suffix = ((optional: boolean, repeat: boolean) => {
        if (optional && repeat) return '*';
        if (!optional && repeat) return '+';
        if (optional && !repeat) return '?';
        if (!optional && !repeat) return '';
    })(item.optional, item.repeat);

    return `${item.name}: ${item.type}${suffix}`;
}

export default function evaluateLambda(node: Lambda, context: Context): SyntaxTreeNode {
    const evaluator = (parameters: SyntaxTreeNode[], context: Context) => {
        const localStackFrame: StackFrame = mapParametersToStackFrame('lambda', parameters, node.header);

        const localContext = {
            ...context,
            stack: [...context.stack, localStackFrame],
        };

        return evaluate(node.value, localContext);
    };

    const serialized = `(${node.header.map(serializeHeaderItem).join(', ')}) → ${
        node.value.type === 'lambda' || node.value.type === 'function'
            ? `(${serialize(node.value, context.options)})`
            : serialize(node.value, context.options)
    }`;

    return createFunction(true, evaluator, node.header, serialized);
}
