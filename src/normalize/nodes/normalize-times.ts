import normalize from '..';
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
    if (node.type !== 'times') {
        return;
    }

    return createTimes(normalize(node.left, context), normalize(node.right, context));
};

const distributeLeftChild: PartialNormalizer = (node, context) => {
    if (node.type !== 'times' || node.left.type !== 'plus') {
        return;
    }

    return normalize(
        createPlus(createTimes(node.left.left, node.right), createTimes(node.left.right, node.right)),
        context,
    );
};

const distributeRightChild: PartialNormalizer = (node, context) => {
    if (node.type !== 'times' || node.right.type !== 'plus') {
        return;
    }

    return normalize(
        createPlus(createTimes(node.left, node.right.left), createTimes(node.left, node.right.right)),
        context,
    );
};

const normalizeTimes = combineNormalizers([
    evaluateIfPossible,
    normalizeChildren,
    distributeLeftChild,
    distributeRightChild,
]);

export default normalizeTimes;
