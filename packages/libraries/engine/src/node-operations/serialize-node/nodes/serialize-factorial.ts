import serialize, { needsBrackets } from '../index';
import { Factorial, Options } from '../../../types';

export default function serializeFactorial(node: Factorial, options: Options) {
    const child = needsBrackets(node.type, node.value.type)
        ? `(${serialize(node.value, options)})`
        : serialize(node.value, options);

    return `${child}!`;
}
