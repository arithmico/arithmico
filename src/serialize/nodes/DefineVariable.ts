import serialize from '..';
import { Options, DefineVariable } from '../../types';

export default function serializeDefineVariable(node: DefineVariable, options: Options): string {
    return `${node.name} := ${serialize(node.value, options)}`;
}
