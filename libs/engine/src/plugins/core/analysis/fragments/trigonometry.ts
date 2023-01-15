import { Options } from '../../../../types/context.types';
import { FunctionHeaderItem, NumberNode } from '../../../../types/nodes.types';
import { SyntaxTreeNode } from '../../../../types';
import createNumberNode from '../../../../node-operations/create-node/create-number-node';
import { closeTo } from '../../../../utils/float-utils';
import { PluginFragment } from '../../../../utils/plugin-builder';

const trigonometryFragment = new PluginFragment().addConstant(
    'pi',
    "π is commonly defined as the ratio of a circle's circumference to its diameter.",
    'Die Kreiszahl π ist allgemein definiert als das Verhältnis des Umfangs eines Kreises zu seinem Durchmesser.',
    createNumberNode(Math.PI),
);

type TrigonometryEvaluator = (v: number, angleUnit: Options['angleUnit']) => number;

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

function addTrigonometryFunction(name: string, func: TrigonometryEvaluator, enName: string, deName: string) {
    const header: FunctionHeaderItem[] = [{ type: 'number', name: 'x', evaluate: true }];

    trigonometryFragment.addFunction(
        name,
        header,
        `Calculates the ${enName} of x.`,
        `Berechnet den ${deName} von x.`,
        ({ getParameter, runtimeError, context }): SyntaxTreeNode => {
            const value = func((<NumberNode>getParameter('x')).value, context.options.angleUnit);

            if (closeTo(value, 0)) {
                return createNumberNode(0);
            }

            if (closeTo(value, 1e15) || !Number.isFinite(value)) {
                throw runtimeError('undefined');
            }

            return createNumberNode(value);
        },
    );
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

export default trigonometryFragment;
