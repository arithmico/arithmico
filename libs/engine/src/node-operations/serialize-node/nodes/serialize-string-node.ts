import { Options, StringNode } from '../../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function serializeStringNode(node: StringNode, _options: Options) {
    return `"${node.value.replace('\\', '\\\\')}"`;
}
