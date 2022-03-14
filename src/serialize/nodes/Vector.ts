import serialize from '..';
import { Options, Vector } from '../../types';

export default function serializeVector(node: Vector, options: Options): string {
    const values = node.values.map((value) => serialize(value, options));
    return `[${values ? values.join(', ') : ''}]`;
}
