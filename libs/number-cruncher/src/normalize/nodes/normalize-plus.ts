import { combineNormalizers, PartialNormalizer } from './../../utils/normalize-utils';
import normalize from '..';
import evaluate from '../../eval';
import createPlus from '../../create/Plus';
import { containsVariables, convertListToOperatorChain, convertOperatorChainToList } from '../../utils/symbolic-utils';
import { SyntaxTreeNode } from '../../types';
import createNumberNode from '../../create/NumberNode';
import equals from '../../equals/equals';

const evaluateIfPossible: PartialNormalizer = (node, context) => {
    if (!containsVariables(node, context)) {
        return evaluate(node, context);
    }
};

const normalizeChildren: PartialNormalizer = (node, context) => {
    if (node.type !== 'plus') {
        return;
    }

    return createPlus(normalize(node.left, context), normalize(node.right, context));
};

const rotateIfLeftChildPlus: PartialNormalizer = (node, context) => {
    if (!(node.type === 'plus' && node.left.type === 'plus')) {
        return;
    }

    const rotatedNode = createPlus(node.left.left, createPlus(node.left.right, node.right));

    return normalize(rotatedNode, context);
};

const combineLeftChildWithRightChildLeftChild: PartialNormalizer = (node, context) => {
    if (
        !(
            node.type === 'plus' &&
            !containsVariables(node.left, context) &&
            node.right.type === 'plus' &&
            !containsVariables(node.right.left, context)
        )
    ) {
        return;
    }

    const normalizedNode = createPlus(evaluate(createPlus(node.left, node.right.left), context), node.right.right);
    return normalize(normalizedNode, context);
};

const moveVariablesRight: PartialNormalizer = (node, context) => {
    if (node.type !== 'plus') {
        return;
    }

    if (node.right.type === 'plus') {
        if (containsVariables(node.left, context) && !containsVariables(node.right.left, context)) {
            return normalize(createPlus(node.right.left, createPlus(node.left, node.right.right)), context);
        }
    } else {
        if (containsVariables(node.left, context) && !containsVariables(node.right, context)) {
            return normalize(createPlus(node.right, node.left), context);
        }
    }
};

const combineMultiples: PartialNormalizer = (node, context) => {
    const summands = convertOperatorChainToList('plus', node);

    if (summands.length < 2) {
        return;
    }

    const results: SyntaxTreeNode[] = [];
    const replaced: number[] = [];

    for (let i = 0; i < summands.length; i++) {
        if (replaced.includes(i)) {
            continue;
        }

        const leftFactors = convertOperatorChainToList('times', summands[i]);
        const leftCoefficients = getCoefficients(leftFactors);
        const leftFactorsWithoutCoefficients = getFactprsWotjpitCoefficients(leftFactors);

        for (let j = i + 1; j < summands.length; j++) {
            if (replaced.includes(j)) {
                continue;
            }

            const rightFactors = convertOperatorChainToList('times', summands[j]);
            const rightCoefficients = getCoefficients(rightFactors);
            const rightFactorsWithoutCoefficients = getFactprsWotjpitCoefficients(rightFactors);

            if (factorsEquals(leftFactorsWithoutCoefficients, rightFactorsWithoutCoefficients)) {
                const newCoefficient = normalize(
                    createPlus(
                        convertListToOperatorChain('times', leftCoefficients),
                        convertListToOperatorChain('times', rightCoefficients),
                    ),
                    context,
                );

                if (newCoefficient.type !== 'number' || newCoefficient.value !== 0) {
                    results.push(
                        convertListToOperatorChain('times', [newCoefficient, ...rightFactorsWithoutCoefficients]),
                    );
                }

                replaced.push(i);
                replaced.push(j);
            }
        }

        if (!replaced.includes(i)) {
            results.push(summands[i]);
        }
    }

    if (results.length === 0) {
        return createNumberNode(0);
    }

    return convertListToOperatorChain('plus', results);
};

function getCoefficients(factors: SyntaxTreeNode[]) {
    const coefficients = factors.filter((factor) => factor.type === 'number');
    return coefficients.length === 0 ? [createNumberNode(1)] : coefficients;
}

function getFactprsWotjpitCoefficients(factors: SyntaxTreeNode[]) {
    const factorsWithoutCoefficients = factors.filter((factor) => factor.type !== 'number');
    return factorsWithoutCoefficients.length === 0 ? [createNumberNode(1)] : factorsWithoutCoefficients;
}

function factorsEquals(leftFactors: SyntaxTreeNode[], rightFactors: SyntaxTreeNode[]): boolean {
    if (leftFactors.length !== rightFactors.length) {
        return false;
    }

    const alreadyMatched: number[] = [];

    for (let i = 0; i < leftFactors.length; i++) {
        let matched = false;

        for (let j = 0; j < rightFactors.length; j++) {
            if (alreadyMatched.includes(j)) {
                continue;
            }

            if (equals(leftFactors[i], rightFactors[j])) {
                matched = true;
                alreadyMatched.push(j);
            }
        }

        if (!matched) {
            return false;
        }
    }

    return true;
}

const normalizePlus = combineNormalizers([
    evaluateIfPossible,
    normalizeChildren,
    rotateIfLeftChildPlus,
    combineLeftChildWithRightChildLeftChild,
    moveVariablesRight,
    combineMultiples,
]);

export default normalizePlus;
