import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { PluginFragment } from '../../../utils/plugin-builder';
import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
// import createVector from '../../../../node-operations/create-node/create-vector';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];
const doubleNumberHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'number', evaluate: true },
    { name: 'a', type: 'number', evaluate: true },
];

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
        }else if (n<1) {
            throw runtimeError('Nur Zahlen größer als 1 möglich');
        }
        return createNumberNode(Math.acosh(n));
    },

)
    .addFunction(
        'ungerade', singleNumberHeader,
        'Rounds up a number to the nearest odd integer',
        'Rundet eine Zahl auf die nächste ungerade ganze Zahl auf',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;

            if (isNaN(n)) {
                throw runtimeError('Funktion ungerade funktioniert nur mit Zahlen');
            }

            const gerundeteZahl = Math.round(n); // Runden
            const istGerade = gerundeteZahl % 2 === 0; // Überprüfen gerundete Zahl gerade?
            const ungeradeZahl = istGerade ? gerundeteZahl + 1 : gerundeteZahl;
            return createNumberNode (ungeradeZahl);
        },
    )

    .addFunction(
        'zufallsbereich', doubleNumberHeader,
        'Returns a random number between two specified numbers or just a random number.',
        'Gibt Zufallszahl zwischen zwei angegebenen Zahlen zurück bzw. eine Zufallszahl.',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;
            const a = (<NumberNode>getParameter('a')).value;
            if (isNaN(n || a)) {
                throw runtimeError('Funktion zufallsbereich funktioniert nur mit Zahlen.');
            }
            else if (n !== undefined && a !== undefined) {
                // Wenn minValue und maxValue definiert sind, generieren Sie eine Zufallszahl im angegebenen Bereich
                return createNumberNode(Math.random() * (a - n) + n);
            } else {
                // Wenn minValue und maxValue nicht definiert sind, generieren Sie einfach eine Zufallszahl zw. 0 und 1
                return createNumberNode(Math.random());
            }
        },
    )


    .addFunction(
    'ASin',
    singleNumberHeader,
    'Returns the arc sine or inverted sine of a number',
    'Gibt den Arkussinus oder umgekehrten Sinus einer Zahl zurück.',
    ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;
        if (isNaN(n)) {
            throw runtimeError('Funktion asin funktioniert nur mit Zahlen.');
        }
        return createNumberNode(Math.asin(n));
    },

)
    .addFunction(
    'Atan',
    singleNumberHeader,
    'Returns the arc tangent or inverse tangent of a number.',
    'Gibt den Arkustangens oder umgekehrten Tangens einer Zahl zurück.',
    ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;
        if (isNaN(n)) {
            throw runtimeError('Funktion atan funktioniert nur mit Zahlen.');
        }
        return createNumberNode(Math.atan(n));
    },

)
    .addFunction(
    'ASinh',
    singleNumberHeader,
    'Returns the inverse hyperbolic sine of a number.',
    'Gibt den umgekehrten hyperbolischen Sinus einer Zahl zurück.',
    ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;
        if (isNaN(n)) {
            throw runtimeError('Funktion asin funktioniert nur mit Zahlen.');
        }else if (n <0) {
            throw runtimeError('Nur Zahlen größer als 0 möglich');
        }
        return createNumberNode(Math.asinh(n));
    },

)
.addFunction(
    'Aufrunden',
    singleNumberHeader,
    'Round up without decimal place',
    'Aufrunden ohne Nachkommastelle',
    ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;
        if (isNaN(n)) {
            throw runtimeError('Funktion Aufrunden funktioniert nur mit Zahlen.');
        }
        return createNumberNode(Math.ceil(n));
    },

)

    .addFunction(
        'BOGENMASS',
        singleNumberHeader,
        'Calculates the Radian to an angle',
        'Berechnet das Bogenmaß eines Winkels',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;
            if (isNaN(n)) {
                throw runtimeError('Funktion Bogenmaß funktioniert nur mit Zahlen.');
            }else if (n <0) {
                throw runtimeError('Nur Zahlen größer als 0 möglich');
            }
            return createNumberNode(n*Math.PI/180);
        },

    );
export default excelConstantsFragment;
