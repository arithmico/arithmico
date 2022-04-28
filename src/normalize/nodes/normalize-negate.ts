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

const normalizeNegate = combineNormalizers([evaluateIfPossible, normalizeChild]);

export default normalizeNegate;
