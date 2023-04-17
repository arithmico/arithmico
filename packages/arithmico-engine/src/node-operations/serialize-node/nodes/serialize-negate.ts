import serialize, { needsBrackets } from '..';
import { Negate, Options } from '../../../types';

export default function serializeNegate(node: Negate, options: Options): string {
    const child = needsBrackets(node.type, node.value.type)
        ? `(${serialize(node.value, options)})`
        : serialize(node.value, options);

    return `-${child}`;
}
