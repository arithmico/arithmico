import serialize from '..';
import { Define, Options } from '../../../types';

export default function serializeDefine(node: Define, options: Options) {
    return `${node.name} := ${serialize(node.value, options)}`;
}
