import normalize from '..';
import createNumberNode from '../../create/NumberNode';
import createPower from '../../create/Power';
import evaluate from '../../eval';
import { combineNormalizers, PartialNormalizer } from '../../utils/normalize-utils';
import { containsVariables } from '../../utils/symbolic-utils';

const evaluateIfPossible: PartialNormalizer = (node, context) => {
    if (!containsVariables(node, context)) {
        return evaluate(node, context);
    }
};

const normalizeChildren: PartialNormalizer = (node, context) => {
    if (node.type !== 'power') {
        return;
    }

    return createPower(normalize(node.left, context), normalize(node.right, context));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const removeOneExponent: PartialNormalizer = (node, _context) => {
    if (node.type !== 'power' || node.right.type !== 'number' || node.right.value !== 1) {
        return;
    }

    return node.left;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const removeZeroExponent: PartialNormalizer = (node, _context) => {
    if (node.type !== 'power' || node.right.type !== 'number' || node.right.value !== 0) {
        return;
    }

    return createNumberNode(1);
};

const normalizePower = combineNormalizers([
    evaluateIfPossible,
    normalizeChildren,
    removeOneExponent,
    removeZeroExponent,
]);

export default normalizePower;
