import normalize from '..';
import evaluate from '../../eval';
import createNegate from '../../create/Negate';
import { containsVariables } from '../../utils/symbolic-utils';
import { combineNormalizers, PartialNormalizer } from './../../utils/normalize-utils';

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

const normalizeNegate = combineNormalizers([evaluateIfPossible, normalizeChild, removeDoubleNegate]);

export default normalizeNegate;
