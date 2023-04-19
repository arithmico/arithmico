import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { PluginFragment } from '../../../utils/plugin-builder';
import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
// import createVector from '../../../../node-operations/create-node/create-vector';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const excelConstantsFragment = new PluginFragment()
    .addConstant('excel:five', 'Test output five', 'Test output fünf', createNumberNode(5))

    .addFunction(
        'arccos',
        singleNumberHeader,
        'Returns the arcus cosine of a number.',
        'Gibt den Arkuskosinus einer Zahl zurück.',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;
            if (isNaN(n)) {
                throw runtimeError('Function only works with numbers.');
            } else if (n < -1 || n > 1) {
                throw runtimeError('Only defined in the interval [-1,1].');
            }
            return createNumberNode(Math.acos(n));
        },
    )
    .addFunction('wurzel', singleNumberHeader,
        'square root.',
        'Quadratwurzel',
        ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;

        if (n < 0) {
            throw runtimeError('Numbers smaller than 0 are not allowed.');
        }

        return createNumberNode(Math.sqrt(n));
    }
    )

    .addFunction(
        'abrunden',
        singleNumberHeader,
        'square root.',
        'Abrunden ohne Nachkomma stelle',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;
            if (isNaN(n)) {
                throw runtimeError('Function abrunden only works with numbers.');
            }

            return createNumberNode(Math.floor(n));
        },
    )

.addFunction(
    'Acosh',
    singleNumberHeader,
    'Returns the inverse hyperbolic cosine of a number',
    'Gibt den umgekehrten hyperbolischen Kosinus einer Zahl zurück',
    ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;
        if (isNaN(n)) {
            throw runtimeError('Function acosh funktioniert nur mit Zahlen.');
        }else if (n <1) {
            throw runtimeError('Nur Zahlen größer als 1 möglich');
        }
        return createNumberNode(Math.acosh(n));
    },
);

export default excelConstantsFragment;