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
import { isEveryElementNumber, isSquareMatrix } from '../../../utils/tensor-utils';
import createVector from '../../../create/Vector';
import {
    addColumn,
    cramerSolver,
    createIdentityMatrix,
    det,
    getColumn,
    tensorToMatrix,
} from '../../../utils/matrix-utils';

const inverseMatrixPlugin = createPlugin('core/inverse-matrix');

addPluginAuthor(inverseMatrixPlugin, 'core');
addPluginDescription(inverseMatrixPlugin, 'adds inversion function for matrizes');

const reverseHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'vector', evaluate: true }];
const detHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'vector', evaluate: true }];
const idMatrixHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

addPluginFunction(
    inverseMatrixPlugin,
    createPluginFunction(
        'matrix:inverse',
        reverseHeader,
        'reverse a given square matrix',
        'Berechnet die inverse Matrix, falls diese existiert.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('det', parameters, detHeader, context);
            const vector = <Vector>parameterStackFrame['n'];

            if (!isEveryElementNumber(vector)) {
                throw 'RuntimeError: inverse: only numbers in a matrix are allowed as elements';
            }
            if (!isSquareMatrix(vector)) {
                throw 'RuntimeError: inverse: not a square matrix';
            }

            const matrix = tensorToMatrix(vector);
            const coefficientsDet = det(matrix);
            if (coefficientsDet === 0) {
                throw "SolveError: The matrix isn't invertible because det = 0";
            }

            const idMatrix = createIdentityMatrix(matrix.length);
            let result: number[][] = new Array(matrix.length).fill(undefined).map(() => []);

            for (let i = 0; i < matrix.length; i++) {
                result = addColumn(cramerSolver(matrix, getColumn(i, idMatrix), coefficientsDet), result);
            }

            return createVector(result.map((value) => createVector(value.map((element) => createNumberNode(element)))));
        },
    ),
);

addPluginFunction(
    inverseMatrixPlugin,
    createPluginFunction(
        'matrix:det',
        detHeader,
        'calculates the determinant of a matrix',
        'Berechnet die Determinante einer Matrix',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('det', parameters, detHeader, context);
            const vector = <Vector>parameterStackFrame['n'];

            if (!isEveryElementNumber(vector)) {
                throw 'RuntimeError: det: only numbers are allowed as elements';
            }
            if (!isSquareMatrix(vector)) {
                throw 'RuntimeError: det: not a square matrix';
            }

            const matrix = tensorToMatrix(vector);

            return createNumberNode(det(matrix));
        },
    ),
);

addPluginFunction(
    inverseMatrixPlugin,
    createPluginFunction(
        'matrix:id',
        idMatrixHeader,
        'creates an n x n identity matrix',
        'Erzeugt eine n x n Einheitsmatrix',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('matrix:id', parameters, idMatrixHeader, context);
            const n = (<NumberNode>parameterStackFrame['n']).value;

            if (n % 1 !== 0) {
                throw 'RuntimeError: matrix:id: only integers are allowed';
            }
            if (n < 0) {
                throw 'RuntimeError: matrix:id: negative numbers are not allowed';
            }
            if (n === 0) {
                throw 'RuntimeError: matrix:id: zero is not allowed';
            }

            const id = createIdentityMatrix(n);

            return createVector(id.map((value) => createVector(value.map((element) => createNumberNode(element)))));
        },
    ),
);

export default inverseMatrixPlugin;
