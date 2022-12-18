import { BooleanNode } from '../../types';

export default function serializeBoolean(node: BooleanNode) {
    return node.value ? 'true' : 'false';
}
