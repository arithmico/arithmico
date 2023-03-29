import { BooleanNode } from '../../types';

export default function createBooleanNode(value: boolean): BooleanNode {
    return {
        type: 'boolean',
        value,
    };
}
