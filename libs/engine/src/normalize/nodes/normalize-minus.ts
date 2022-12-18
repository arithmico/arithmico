import normalize from '..';
import evaluate from '../../eval';
import createMinus from '../../create-node/create-minus';
import createNegate from '../../create-node/create-negate';
import createPlus from '../../create-node/create-plus';
import { containsVariables } from '../../utils/symbolic-utils';
import { combineNormalizers, PartialNormalizer } from '../../utils/normalize-utils';

const evaluateIfPossible: PartialNormalizer = (node, context) => {
    if (!containsVariables(node, context)) {
        return evaluate(node, context);
    }
};

const normalizeChildren: PartialNormalizer = (node, context) => {
    if (node.type !== 'minus') {
        return;
    }

    return createMinus(normalize(node.left, context), normalize(node.right, context));
};

const replaceMinusWithNegate: PartialNormalizer = (node, context) => {
    if (node.type !== 'minus') {
        return;
    }

    return normalize(createPlus(node.left, createNegate(node.right)), context);
};

const normalizeMinus = combineNormalizers([normalizeChildren, replaceMinusWithNegate, evaluateIfPossible]);

export default normalizeMinus;
