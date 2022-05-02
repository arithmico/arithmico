import normalize from '..';
import createDivided from '../../create/Divided';
import createNegate from '../../create/Negate';
import createPlus from '../../create/Plus';
import createTimes from '../../create/Times';
import evaluate from '../../eval';
import { combineNormalizers, PartialNormalizer } from '../../utils/normalize-utils';
import { containsVariables } from '../../utils/symbolic-utils';

const evaluateIfPossible: PartialNormalizer = (node, context) => {
    if (!containsVariables(node, context)) {
        return evaluate(node, context);
    }
};

const normalizeChildren: PartialNormalizer = (node, context) => {
    if (node.type !== 'divided') {
        return;
    }

    return createDivided(normalize(node.left, context), normalize(node.right, context));
};

const distributeLeftChildPlus: PartialNormalizer = (node, context) => {
    if (node.type !== 'divided' || node.left.type !== 'plus') {
        return;
    }

    return normalize(
        createPlus(createDivided(node.left.left, node.right), createDivided(node.left.right, node.right)),
        context,
    );
};

const flipRightChildDivided: PartialNormalizer = (node, context) => {
    if (node.type !== 'divided' || node.right.type !== 'divided') {
        return;
    }

    return normalize(createTimes(node.left, createDivided(node.right.right, node.right.left)), context);
};

const moveLeftNegateOut: PartialNormalizer = (node, context) => {
    if (node.type !== 'divided' || node.left.type !== 'negate') {
        return;
    }

    return normalize(createNegate(createDivided(node.left.value, node.right)), context);
};

const moveRightNegateOut: PartialNormalizer = (node, context) => {
    if (node.type !== 'divided' || node.right.type !== 'negate') {
        return;
    }

    return normalize(createNegate(createDivided(node.left, node.right.value)), context);
};

const normalizeDivided = combineNormalizers([
    evaluateIfPossible,
    normalizeChildren,
    distributeLeftChildPlus,
    flipRightChildDivided,
    moveLeftNegateOut,
    moveRightNegateOut,
]);

export default normalizeDivided;
