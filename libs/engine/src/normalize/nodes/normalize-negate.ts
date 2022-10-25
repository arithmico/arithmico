import normalize from '..';
import evaluate from '../../eval';
import createNegate from '../../create/create-negate';
import { containsVariables } from '../../utils/symbolic-utils';
import { combineNormalizers, PartialNormalizer } from '../../utils/normalize-utils';
import createTimes from '../../create/create-times';
import createNumberNode from '../../create/create-number-node';

const evaluateIfPossible: PartialNormalizer = (node, context) => {
    if (!containsVariables(node, context)) {
        return evaluate(node, context);
    }
};

const normalizeChild: PartialNormalizer = (node, context) => {
    if (node.type !== 'negate') {
        return;
    }

    return createNegate(normalize(node.value, context));
};

const removeDoubleNegate: PartialNormalizer = (node) => {
    if (node.type !== 'negate' || node.value.type !== 'negate') {
        return;
    }

    return node.value.value;
};

const replaceNegateWithTimes: PartialNormalizer = (node, context) => {
    if (node.type !== 'negate') {
        return;
    }

    return normalize(createTimes(createNumberNode(-1), node.value), context);
};

const normalizeNegate = combineNormalizers([
    normalizeChild,
    removeDoubleNegate,
    replaceNegateWithTimes,
    evaluateIfPossible,
]);

export default normalizeNegate;
