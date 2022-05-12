import createFunctionCall from '../../../create/FunctionCall';
import createNumberNode from '../../../create/NumberNode';
import evaluate from '../../../eval';
import { FunctionHeaderItem, FunctionNode, NumberNode } from '../../../types/SyntaxTreeNodes';
import { binco } from '../../../utils/binco';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';

const H_COEFFICIENT = 1e-6;

const nderivePlugin = createPlugin('nderive');

addPluginAuthor(nderivePlugin, 'core');
addPluginDescription(nderivePlugin, 'adds nderive function');

const nderiveHeader: FunctionHeaderItem[] = [
    { type: 'function', name: 'f', evaluate: true },
    { type: 'number', name: 'position', evaluate: true },
    { type: 'number', name: 'grade', evaluate: true, optional: true },
];

addPluginFunction(
    nderivePlugin,
    createPluginFunction(
        'nderive',
        nderiveHeader,
        'Calculates the derivative of the function for the given position.',
        'Berechnet den Wert der Ableitungsfunktion an der gegebenen Position.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('nintegrate', parameters, nderiveHeader, context);
            const f = <FunctionNode>parameterStackFrame['f'];
            const position = (<NumberNode>parameterStackFrame['position']).value;
            const rawGrade = parameterStackFrame['grade'];
            const grade = !rawGrade || rawGrade.type !== 'number' ? 1 : rawGrade.value;

            if (grade < 1 || grade % 1 !== 0) {
                throw 'RuntimeError: nderive: invalid grade';
            }

            if (f.header.length !== 1 || (f.header[0].type !== 'number' && f.header[0].type !== 'any')) {
                throw 'RuntimeError: nderive: invalid function signature';
            }

            const value = createNumberNode(0);
            const expression = createFunctionCall(f, [value]);
            const h = Math.abs(position) * H_COEFFICIENT;

            let result = 0;

            const cOuter = Math.pow(2 * h, -grade);

            for (let i = 0; i <= grade; i++) {
                const cInner = Math.pow(-1, i) * binco(grade, i);
                console.log(i, cInner);

                value.value = position + (grade - 2 * i) * h;
                const y = evaluate(expression, context);

                if (y.type !== 'number') {
                    throw 'RuntimeError: nderive: cannot derive not scalar function';
                }

                result += y.value * cInner * cOuter;
            }

            return createNumberNode(result);
        },
    ),
);

export default nderivePlugin;
