import { StackFrame } from './../types/Context';
import { SyntaxTreeNode, FunctionHeaderItem } from '../types/SyntaxTreeNodes';

export function mapParametersToStackFrame(
    name: string,
    parameters: SyntaxTreeNode[],
    header: FunctionHeaderItem[],
): StackFrame {
    const stackFrame: StackFrame = {};
    let parameterIndex = 0;
    let matched = 0;

    for (const headerItem of header) {
        matched = 0;

        if (!headerItem.optional && parameters.slice(parameterIndex).length === 0) {
            throw `TypeError: ${name}: argument #${parameterIndex + 1}: invalid number of arguments expected ${
                headerItem.type
            } got nothing`;
        }

        for (const parameter of parameters.slice(parameterIndex)) {
            if (parameter.type === headerItem.type || headerItem.type === 'any') {
                parameterIndex++;
                if (headerItem.repeat) {
                    stackFrame[`${headerItem.name}_${matched}`] = parameter;
                    matched++;
                } else {
                    stackFrame[headerItem.name] = parameter;
                    break;
                }
            } else {
                if (headerItem.repeat && matched) {
                    break;
                }
                if (headerItem.optional) {
                    break;
                }
                throw `TypeError: ${name}: argument #${parameterIndex + 1}: expected ${headerItem.type} got ${
                    parameter.type
                }`;
            }
        }
    }

    if (parameterIndex !== parameters.length) {
        throw `TypeError: ${name}: argument #${parameterIndex + 1}: invalid number of arguments expected nothing got ${
            parameters[parameterIndex].type
        }`;
    }

    return stackFrame;
}
