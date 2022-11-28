import serialize from '..';
import { Options, FunctionCall } from '../../types';

export default function serializeFunctionCall(node: FunctionCall, options: Options): string {
    const parameters = node.parameters.map((parameter) => serialize(parameter, options));
    return `${serialize(node.function, options)}(${
        parameters.length > 0 ? parameters.join(options.decimalSeparator === '.' ? ', ' : '; ') : ''
    })`;
}
