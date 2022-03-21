import { NumberNode } from './../../types/SyntaxTreeNodes';
import { SyntaxTreeNode, Context } from '../../types';
import createNumberNode from '../../create/NumberNode';
import { createParameterValidator } from '../../utils/parameter-validator';
import {
    addPluginAuthor,
    addPluginConstant,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
} from '../../utils/plugin-builder';
import { closeTo } from '../../utils/float-utils';

const trigonometryPlugin = createPlugin('core/trigonometry');

addPluginAuthor(trigonometryPlugin, 'core');
addPluginDescription(trigonometryPlugin, 'adds trigonometry functions and constants');

addPluginConstant(trigonometryPlugin, {
    name: 'pi',
    value: createNumberNode(Math.PI),
    documentation: {
        en: {
            synopsis: 'pi',
            description: "π is commonly defined as the ratio of a circle's circumference C to its diameter d",
        },
        de: {
            synopsis: 'pi',
            description: 'Kreiszahl π',
        },
    },
});

function addTrigonometryFunction(name: string, func: (v: number) => number, enName: string, deName: string) {
    addPluginFunction(trigonometryPlugin, {
        name: name,
        evaluateParametersBefore: true,
        parameterValidator: createParameterValidator(name, ['number']),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        evaluator: (parameters: SyntaxTreeNode[], _context: Context) => {
            const value = func((parameters[0] as NumberNode).value);

            if (closeTo(value, 0)) {
                return createNumberNode(0);
            }

            if (closeTo(value, 1e15) || !Number.isFinite(value)) {
                throw `RuntimeError: ${name}: undefined`;
            }

            return createNumberNode(value);
        },
        documentation: {
            en: {
                synopsis: `${name}(x)`,
                description: `calculates the ${enName} of x`,
            },
            de: {
                synopsis: `${name}(x)`,
                description: `berechnet den ${deName} von x`,
            },
        },
    });
}

addTrigonometryFunction('sin', Math.sin, 'sine', 'Sinus');
addTrigonometryFunction('cos', Math.cos, 'cosine', 'Cosinus');
addTrigonometryFunction('tan', Math.tan, 'tangent', 'Tangens');
addTrigonometryFunction('asin', Math.asin, 'arcsine', 'Arkussinus');
addTrigonometryFunction('acos', Math.acos, 'arc cosine', 'Arkuscosinus');
addTrigonometryFunction('atan', Math.atan, 'arctangent', 'Arkustangens');

addTrigonometryFunction('sinh', Math.sinh, 'hyperbolic sine', 'Sinus hyperbolicus');
addTrigonometryFunction('cosh', Math.cosh, 'hyperbolic cosine', 'Cosinus hyperbolics');
addTrigonometryFunction('tanh', Math.tanh, 'hyperbolic tangent', 'Tanges hyperbolics');
addTrigonometryFunction('asinh', Math.asinh, 'inverse hyperbolic sine', 'Areasinus hyperbolicus');
addTrigonometryFunction('acosh', Math.acosh, 'inverse hyperbolic cosine', 'Areacosinus hyperbolicus');
addTrigonometryFunction('atanh', Math.atanh, 'inverse hyperbolic tangent', 'Areatangens hyperbolicus');

export default trigonometryPlugin;
