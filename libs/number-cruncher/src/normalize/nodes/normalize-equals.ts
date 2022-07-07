import normalize from '..';
import createEquals from '../../create/create-equals';
import createMinus from '../../create/create-minus';
import createNumberNode from '../../create/create-number-node';
import { combineNormalizers, PartialNormalizer } from '../../utils/normalize-utils';

const normalizeChildren: PartialNormalizer = (node, context) => {
    if (node.type !== 'equals') {
        return;
    }

    return createEquals(normalize(node.left, context), normalize(node.right, context));
};

const moveEverythingLeft: PartialNormalizer = (node, context) => {
    if (node.type !== 'equals' || (node.right.type === 'number' && node.right.value === 0)) {
        return;
    }

    return createEquals(normalize(createMinus(node.left, node.right), context), createNumberNode(0));
};

const normalizeEquals = combineNormalizers([normalizeChildren, moveEverythingLeft]);

export default normalizeEquals;
