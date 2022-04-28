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

const moveVariablesRight: PartialNormalizer = (node, context) => {
    if (node.type !== 'plus') {
        return;
    }

    if (containsVariables(node.left, context) && !containsVariables(node.right, context)) {
        return createPlus(node.right, node.left);
    }
};

const normalizePlus = combineNormalizers([evaluateIfPossible, normalizeChildren, moveVariablesRight]);

export default normalizePlus;
