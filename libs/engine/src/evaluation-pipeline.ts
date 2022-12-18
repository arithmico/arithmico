import { parse } from '@arithmico/parser';
import { Context, SyntaxTreeNode } from './types';
import evaluateNode from './evaluate-node';
import { insertStackObject } from './utils/context-utils';
import serialize from './serialize-node';
import { pipe } from './utils/pipe';

function pipeParseInput({ input, context }: { input: string; context: Context }) {
    try {
        const node = parse(input, {
            language: context.options.decimalSeparator === ',' ? 'de' : 'en',
        }) as SyntaxTreeNode;

        return {
            node,
            context,
        };
    } catch (parseError) {
        throw `SyntaxError: ${parseError.message}`;
    }
}

function pipeEvaluateNode({ node, context }: { node: SyntaxTreeNode; context: Context }) {
    const evaluatedNode = evaluateNode(node, context);
    return {
        node: evaluatedNode,
        context,
    };
}

function pipeModifyContext({ node, context }: { node: SyntaxTreeNode; context: Context }) {
    if (node.type !== 'define') {
        return { node, context };
    }

    return {
        node,
        context: insertStackObject(node.name, node.value, context),
    };
}

function pipeSerialize({ node, context }: { node: SyntaxTreeNode; context: Context }) {
    return {
        result: serialize(node, context.options),
        context,
    };
}

const evaluateInput = pipe(pipeParseInput, pipeEvaluateNode, pipeModifyContext, pipeSerialize);

export default evaluateInput;
