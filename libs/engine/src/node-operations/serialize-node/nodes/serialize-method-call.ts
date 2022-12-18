import serialize, { needsBrackets } from '..';
import { MethodCall, Options } from '../../../types';

export default function serializeMethodCall(node: MethodCall, options: Options) {
    return `${
        needsBrackets(node.type, node.object.type)
            ? `(${serialize(node.object, options)})`
            : serialize(node.object, options)
    }.${node.method}(${node.parameters.map((parameter) => serialize(parameter, options)).join(', ')})`;
}
