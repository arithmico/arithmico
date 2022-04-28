import { combineNormalizers, PartialNormalizer } from './../../utils/normalize-utils';
import normalize from '..';
import evaluate from '../../eval';
import createPlus from '../../create/Plus';
import { containsVariables } from '../../utils/symbolic-utils';

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

const evaluateIfRightChildPlusLeftNotVariable: PartialNormalizer = (node, context) => {
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

    if (containsVariables(node.left, context) && !containsVariables(node.right, context)) {
        return createPlus(node.right, node.left);
    }
};

const normalizePlus = combineNormalizers([
    evaluateIfPossible,
    normalizeChildren,
    rotateIfLeftChildPlus,
    evaluateIfRightChildPlusLeftNotVariable,
    moveVariablesRight,
]);

export default normalizePlus;
