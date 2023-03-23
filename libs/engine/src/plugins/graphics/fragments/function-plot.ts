import createFunctionCall from '../../../node-operations/create-node/create-function-call';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import evaluate from '../../../node-operations/evaluate-node';
import { FunctionHeaderItem, FunctionNode, NumberNode } from '../../../types';
import { Cartesian2DGraphic, Point2D } from '../../../types/graphics.types';
import { PluginFragment } from '../../../utils/plugin-builder';

const plotResolution = 1000;

const plotHeader: FunctionHeaderItem[] = [
    { type: 'function', name: 'f', evaluate: true },
    { type: 'number', name: 'xMin', evaluate: true, optional: true },
    { type: 'number', name: 'xMax', evaluate: true, optional: true },
];

const functionPlotFragment = new PluginFragment();

__FUNCTIONS.plot &&
    functionPlotFragment.addFunction(
        'plot',
        plotHeader,
        'Creates a plot of the function f in the range xMin to xMax on the x-axis. Default value for xMin is -10 and for xMax is 10.',
        'Erzeugt einen Plot der Funktion f im Bereich xMin bis xMax auf der x-Achse. Der Standardwert für xMin ist -10 und für xMax ist 10.',
        ({ getParameter, typeError, runtimeError, context }): Cartesian2DGraphic => {
            const f = getParameter('f') as FunctionNode;
            const xMinNode = getParameter('xMin', createNumberNode(-10)) as NumberNode;
            const xMaxNode = getParameter('xMax', createNumberNode(10)) as NumberNode;
            const xMin = Math.min(xMinNode.value, xMaxNode.value);
            const xMax = Math.max(xMinNode.value, xMaxNode.value);

            if (f.header.length !== 1 || !['number', 'any'].includes(f.header.at(0).type)) {
                throw typeError('invalid function signature');
            }

            if (xMin === xMax) {
                throw runtimeError('xMax must be greater than xMin');
            }

            const points: Point2D[] = [];

            for (let i = 0; i <= plotResolution; i++) {
                const x = xMin + ((xMax - xMin) * i) / plotResolution;
                const yNode = evaluate(createFunctionCall(f, [createNumberNode(x)]), context);
                if (yNode.type !== 'number') {
                    throw runtimeError(`invalid return type expected number got ${yNode.type}`);
                }
                points.push({ x: x, y: yNode.value });
            }

            const yMin = points.map((point) => point.y).reduce((a, b) => Math.min(a, b));
            const yMax = points.map((point) => point.y).reduce((a, b) => Math.max(a, b));
            const height = yMax - yMin;
            const bottomPadding = Math.max(0, yMin);
            const topPadding = Math.abs(Math.min(yMax, 0));

            return {
                type: 'graphic',
                graphicType: 'cartesian2D',
                limits: {
                    xMin,
                    yMin: bottomPadding / height <= 0.25 ? yMin - bottomPadding : yMin,
                    xMax,
                    yMax: topPadding / height <= 0.25 ? yMax + topPadding : yMax,
                },
                xTicks: 'auto',
                yTicks: 'auto',
                lines: [
                    {
                        type: 'line',
                        points,
                    },
                ],
            };
        },
    );

export default functionPlotFragment;
