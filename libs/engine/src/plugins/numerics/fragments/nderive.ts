import createFunctionCall from '../../../node-operations/create-node/create-function-call';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import evaluate from '../../../node-operations/evaluate-node';
import { FunctionHeaderItem, FunctionNode, NumberNode } from '../../../types/nodes.types';
import { binco } from '../../../utils/binco';
import { PluginFragment } from '../../../utils/plugin-builder';

const H_COEFFICIENT = 1e-6;

const nderiveHeader: FunctionHeaderItem[] = [
    { type: 'function', name: 'f', evaluate: true },
    { type: 'number', name: 'position', evaluate: true },
    { type: 'number', name: 'grade', evaluate: true, optional: true },
];

const nderiveFragment = new PluginFragment();

__FUNCTIONS.nderive &&
    nderiveFragment.addFunction(
        'nderive',
        nderiveHeader,
        'Calculates the derivative of the function for the given position.',
        'Berechnet den Wert der Ableitungsfunktion an der gegebenen Position.',
        ({ getParameter, runtimeError, context }) => {
            const f = <FunctionNode>getParameter('f');
            const position = (<NumberNode>getParameter('position')).value;
            const grade = (<NumberNode>getParameter('grade', createNumberNode(1))).value;

            if (grade < 1 || grade % 1 !== 0) {
                throw runtimeError('Invalid grade.');
            }

            if (f.header.length !== 1 || (f.header[0].type !== 'number' && f.header[0].type !== 'any')) {
                throw runtimeError('Invalid function signature.');
            }

            const value = createNumberNode(position);
            const expression = createFunctionCall(f, [value]);
            evaluate(expression, context);
            const h = Math.abs(position >= 1 ? position : 1) * H_COEFFICIENT;

            let result = 0;

            const cOuter = Math.pow(2 * h, -grade);

            for (let i = 0; i <= grade; i++) {
                const cInner = Math.pow(-1, i) * binco(grade, i);

                value.value = position + (grade - 2 * i) * h;
                const y = evaluate(expression, context);

                if (y.type !== 'number') {
                    throw 'RuntimeError: nderive: cannot derive not scalar function';
                }

                result += y.value * cInner * cOuter;
            }

            return createNumberNode(result);
        },
    );

export default nderiveFragment;
