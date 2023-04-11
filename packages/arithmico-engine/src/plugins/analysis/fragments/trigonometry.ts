import { Options } from '../../../types/context.types';
import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import { SyntaxTreeNode } from '../../../types';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { closeTo } from '../../../utils/math-utils/float-utils';
import { PluginFragment } from '../../../utils/plugin-builder';

const trigonometryFragment = new PluginFragment();

__CONSTANTS.pi &&
    trigonometryFragment.addConstant(
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

__FUNCTIONS.sin && addTrigonometryFunction('sin', resolveAngleUnitInput(Math.sin), 'sine', 'Sinus');
__FUNCTIONS.cos && addTrigonometryFunction('cos', resolveAngleUnitInput(Math.cos), 'cosine', 'Cosinus');
__FUNCTIONS.tan && addTrigonometryFunction('tan', resolveAngleUnitInput(Math.tan), 'tangent', 'Tangens');
__FUNCTIONS.asin && addTrigonometryFunction('asin', resolveAngleUnitOutput(Math.asin), 'arcsine', 'Arkussinus');
__FUNCTIONS.acos && addTrigonometryFunction('acos', resolveAngleUnitOutput(Math.acos), 'arc cosine', 'Arkuscosinus');
__FUNCTIONS.atan && addTrigonometryFunction('atan', resolveAngleUnitOutput(Math.atan), 'arctangent', 'Arkustangens');

__FUNCTIONS.sinh && addTrigonometryFunction('sinh', Math.sinh, 'hyperbolic sine', 'Sinus hyperbolicus');
__FUNCTIONS.cosh && addTrigonometryFunction('cosh', Math.cosh, 'hyperbolic cosine', 'Cosinus hyperbolicus');
__FUNCTIONS.tanh && addTrigonometryFunction('tanh', Math.tanh, 'hyperbolic tangent', 'Tanges hyperbolicus');
__FUNCTIONS.asinh && addTrigonometryFunction('asinh', Math.asinh, 'inverse hyperbolic sine', 'Areasinus hyperbolicus');
__FUNCTIONS.acosh &&
    addTrigonometryFunction('acosh', Math.acosh, 'inverse hyperbolic cosine', 'Areacosinus hyperbolicus');
__FUNCTIONS.atanh &&
    addTrigonometryFunction('atanh', Math.atanh, 'inverse hyperbolic tangent', 'Areatangens hyperbolicus');

export default trigonometryFragment;
