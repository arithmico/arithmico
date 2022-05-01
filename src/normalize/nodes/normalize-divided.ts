import normalize from '..';
import createDivided from '../../create/Divided';
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

const normalizeDivided = combineNormalizers([evaluateIfPossible, normalizeChildren]);

export default normalizeDivided;
