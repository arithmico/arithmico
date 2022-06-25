0import { Options } from './../../../types/Context';
import { NumberNode, FunctionHeaderItem } from '../../../types/SyntaxTreeNodes';
import { SyntaxTreeNode, Context } from '../../../types';
import createNumberNode from '../../../create/NumberNode';
import {
    addPluginAuthor,
    addPluginConstant,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { closeTo } from '../../../utils/float-utils';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';

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

type TrigonometryEvaluator = (v: number, angleUnit: Options['angleUnit']) => number;

function addTrigonometryFunction(name: string, func: TrigonometryEvaluator, enName: string, deName: string) {
    const header: FunctionHeaderItem[] = [{ type: 'number', name: 'x', evaluate: true }];

    addPluginFunction(
        trigonometryPlugin,
        createPluginFunction(
            name,
            header,
            `calculates the ${enName} of x`,
            `berechnet den ${deName} von x`,
            (parameters: SyntaxTreeNode[], context: Context): SyntaxTreeNode => {
                const stackFrame = mapParametersToStackFrame(name, parameters, header, context);
                const value = func((stackFrame.x as NumberNode).value, context.options.angleUnit);

                if (closeTo(value, 0)) {
                    return createNumberNode(0);
                }

                if (closeTo(value, 1e15) || !Number.isFinite(value)) {
                    throw `RuntimeError: ${name}: undefined`;
                }

                return createNumberNode(value);
            },
        ),
    );
}

function convertRadiansToDegree(radians: number) {
    return (180 * radians) / Math.PI;
}

function convertDegreesToRadians(degrees: number) {
    return (Math.PI * degrees) / 180;
}

function resolveAngleUnitInput(f: (x: number) => number): TrigonometryEvaluator {
    return (v, angleUnit) => {
        return angleUnit === 'degrees' ? f(convertDegreesToRadians(v)) : f(v);
    };
}

function resolveAngleUnitOutput(f: (x: number) => number): TrigonometryEvaluator {
    return (v, angleUnit) => {
        return angleUnit === 'degrees' ? convertRadiansToDegree(f(v)) : f(v);
    };
}

addTrigonometryFunction('sin', resolveAngleUnitInput(Math.sin), 'sine', 'Sinus');
addTrigonometryFunction('cos', resolveAngleUnitInput(Math.cos), 'cosine', 'Cosinus');
addTrigonometryFunction('tan', resolveAngleUnitInput(Math.tan), 'tangent', 'Tangens');
addTrigonometryFunction('asin', resolveAngleUnitOutput(Math.asin), 'arcsine', 'Arkussinus');
addTrigonometryFunction('acos', resolveAngleUnitOutput(Math.acos), 'arc cosine', 'Arkuscosinus');
addTrigonometryFunction('atan', resolveAngleUnitOutput(Math.atan), 'arctangent', 'Arkustangens');

addTrigonometryFunction('sinh', Math.sinh, 'hyperbolic sine', 'Sinus hyperbolicus');
addTrigonometryFunction('cosh', Math.cosh, 'hyperbolic cosine', 'Cosinus hyperbolics');
addTrigonometryFunction('tanh', Math.tanh, 'hyperbolic tangent', 'Tanges hyperbolics');
addTrigonometryFunction('asinh', Math.asinh, 'inverse hyperbolic sine', 'Areasinus hyperbolicus');
addTrigonometryFunction('acosh', Math.acosh, 'inverse hyperbolic cosine', 'Areacosinus hyperbolicus');
addTrigonometryFunction('atanh', Math.atanh, 'inverse hyperbolic tangent', 'Areatangens hyperbolicus');

export default trigonometryPlugin;
