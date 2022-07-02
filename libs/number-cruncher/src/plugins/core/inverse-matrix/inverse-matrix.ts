import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { FunctionHeaderItem, NumberNode, Vector } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import createNumberNode from '../../../create/NumberNode';
import { det } from '../../../utils/calculate-det';
import { getTensorRank, isSquareMatrix } from '../../../utils/tensor-utils';
import IfThenElse from '../if-then-else/if-then-else';
import { forwardRefWithAs } from '@headlessui/react/dist/utils/render';

const inverseMatrixPlugin = createPlugin('core/inverse-matrix');

addPluginAuthor(inverseMatrixPlugin, 'core');
addPluginDescription(inverseMatrixPlugin, 'adds inversion function for matrizes');

const detHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'vector', evaluate: true }];

function checkAllElementsNumbers(tensor: Vector): boolean {
    return tensor.values.every((element) => {
        if (element.type === 'number') {
            return true;
        } else if (element.type === 'vector') {
            return checkAllElementsNumbers(element);
        }
        return false;
    });
}

addPluginFunction(
    inverseMatrixPlugin,
    createPluginFunction(
        'det',
        detHeader,
        'calculates the determinant of a matrix',
        'Berechnet die Determinantne einer Matrix',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('det', parameters, detHeader, context);
            const vector = <Vector>parameterStackFrame['n'];

            if (!isSquareMatrix(vector)) {
                throw 'RuntimeError: det: not a square matrix';
            }
            if (!checkAllElementsNumbers(vector)) {
                throw 'RuntimeError: det: only numbers are allowed as elements';
            }

            const matrix = vector.values.map((element) => (<Vector>element).values.map((e) => (<NumberNode>e).value));

            return createNumberNode(det(matrix));
        },
    ),
);

export default inverseMatrixPlugin;
