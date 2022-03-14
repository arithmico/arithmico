import serialize from '..';
import { Options, DefineFunction } from '../../types';

export default function serializeDefineFunction(node: DefineFunction, options: Options) {
    const parameters = node.parameters.map((parameter) => `${parameter.name}: ${parameter.type}`);
    return `${node.name}(${parameters.length > 0 ? parameters.join(', ') : ''}) := ${serialize(node.value, options)}`;
}
