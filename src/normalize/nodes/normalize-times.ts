import { Context } from './../../types/Context';
import { SyntaxTreeNode } from './../../types/SyntaxTreeNodes';
import normalize from '..';
import createNegate from '../../create/Negate';
import createPlus from '../../create/Plus';
import createTimes from '../../create/Times';
import evaluate from '../../eval';
import { combineNormalizers, PartialNormalizer } from '../../utils/normalize-utils';
import { containsVariables, convertListToOperatorChain, convertOperatorChainToList } from '../../utils/symbolic-utils';
import createPower from '../../create/Power';
import createNumberNode from '../../create/NumberNode';

const evaluateIfPossible: PartialNormalizer = (node, context) => {
    if (!containsVariables(node, context)) {
        return evaluate(node, context);
    }
};

const normalizeChildren: PartialNormalizer = (node, context) => {
    if (node.type !== 'times') {
        return;
    }

    return createTimes(normalize(node.left, context), normalize(node.right, context));
};

const moveVariablesRight: PartialNormalizer = (node, context) => {
    if (node.type !== 'times') {
        return;
    }

    if (containsVariables(node.left, context) && !containsVariables(node.right, context)) {
        return normalize(createTimes(node.right, node.left), context);
    }
};

const rotateIfLeftChildTimes: PartialNormalizer = (node, context) => {
    if (!(node.type === 'times' && node.left.type === 'times')) {
        return;
    }

    const rotatedNode = createTimes(node.left.left, createTimes(node.left.right, node.right));

    return normalize(rotatedNode, context);
};

const combineLeftChildWithRightChildLeftChild: PartialNormalizer = (node, context) => {
    if (
        !(
            node.type === 'times' &&
            !containsVariables(node.left, context) &&
            node.right.type === 'times' &&
            !containsVariables(node.right.left, context)
        )
    ) {
        return;
    }

    const normalizedNode = createTimes(evaluate(createTimes(node.left, node.right.left), context), node.right.right);
    return normalize(normalizedNode, context);
};

const distributeLeftChildPlus: PartialNormalizer = (node, context) => {
    if (node.type !== 'times' || node.left.type !== 'plus') {
        return;
    }

    return normalize(
        createPlus(createTimes(node.left.left, node.right), createTimes(node.left.right, node.right)),
        context,
    );
};

const distributeRightChildPlus: PartialNormalizer = (node, context) => {
    if (node.type !== 'times' || node.right.type !== 'plus') {
        return;
    }

    return normalize(
        createPlus(createTimes(node.left, node.right.left), createTimes(node.left, node.right.right)),
        context,
    );
};

const moveLeftNegateOut: PartialNormalizer = (node, context) => {
    if (node.type !== 'times' || node.left.type !== 'negate') {
        return;
    }

    return normalize(createNegate(createTimes(node.left.value, node.right)), context);
};

const moveRightNegateOut: PartialNormalizer = (node, context) => {
    if (node.type !== 'times' || node.right.type !== 'negate') {
        return;
    }

    return normalize(createNegate(createTimes(node.left, node.right.value)), context);
};

const combinePowersNormalizer: PartialNormalizer = (node, context) => {
    if (node.type !== 'times') {
        return;
    }

    return convertListToOperatorChain('times', combinePowers(convertOperatorChainToList('times', node), context));
};

function combinePowers(nodes: SyntaxTreeNode[], context: Context): SyntaxTreeNode[] {
    const result: SyntaxTreeNode[] = [];
    const replaced: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
        if (replaced.includes(i)) {
            continue;
        }

        const leftItem = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
            if (replaced.includes(j)) {
                continue;
            }

            const rightItem = nodes[j];

            if (leftItem.type === 'symbol' && rightItem.type === 'symbol' && leftItem.name === rightItem.name) {
                replaced.push(i);
                replaced.push(j);
                result.push(createPower(leftItem, createNumberNode(2)));
            } else if (
                leftItem.type === 'symbol' &&
                rightItem.type === 'power' &&
                rightItem.left.type === 'symbol' &&
                leftItem.name === rightItem.left.name
            ) {
                replaced.push(i);
                replaced.push(j);
                result.push(
                    createPower(leftItem, normalize(createPlus(createNumberNode(1), rightItem.right), context)),
                );
            } else if (
                rightItem.type === 'symbol' &&
                leftItem.type === 'power' &&
                leftItem.left.type === 'symbol' &&
                rightItem.name === leftItem.left.name
            ) {
                replaced.push(i);
                replaced.push(j);
                result.push(
                    createPower(rightItem, normalize(createPlus(createNumberNode(1), leftItem.right), context)),
                );
            } else if (
                leftItem.type === 'power' &&
                leftItem.left.type === 'symbol' &&
                rightItem.type === 'power' &&
                rightItem.left.type === 'symbol' &&
                leftItem.left.name === rightItem.left.name
            ) {
                replaced.push(i);
                replaced.push(j);
                result.push(
                    createPower(leftItem.left, normalize(createPlus(leftItem.right, rightItem.right), context)),
                );
            }
        }

        if (!replaced.includes(i)) {
            result.push(leftItem);
        }
    }

    return result;
}

const normalizeTimes = combineNormalizers([
    evaluateIfPossible,
    normalizeChildren,
    moveVariablesRight,
    rotateIfLeftChildTimes,
    combineLeftChildWithRightChildLeftChild,
    distributeLeftChildPlus,
    distributeRightChildPlus,
    moveLeftNegateOut,
    moveRightNegateOut,
    combinePowersNormalizer,
]);

export default normalizeTimes;
