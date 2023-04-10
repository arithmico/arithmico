import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { FunctionHeaderItem, FunctionNode, NumberNode } from '../../../types';
import { Cartesian2DGraphic, GraphicNode, Line2D } from '../../../types/graphics.types';
import { PluginFragment } from '../../../utils/plugin-builder';
import { scanFunction } from './utils/scan-function';

const DEFAULT_HEIGHT = 10;

const plotHeader: FunctionHeaderItem[] = [
    { type: 'function', name: 'f', evaluate: true, repeat: true },
    { type: 'number', name: 'xMin', evaluate: true, optional: true },
    { type: 'number', name: 'xMax', evaluate: true, optional: true },
    { type: 'number', name: 'yMin', evaluate: true, optional: true },
    { type: 'number', name: 'yMax', evaluate: true, optional: true },
];

const functionPlotFragment = new PluginFragment();

__FUNCTIONS.plot &&
    functionPlotFragment.addFunction(
        'plot',
        plotHeader,
        'Creates a plot of the function f in the optional range xMin to xMax on the x-axis and from yMin to yMax on the y-axis. Default value for xMin is -10. Default value for xMax is 10.',
        'Erzeugt einen Plot der Funktion f im optionalen Bereich xMin bis xMax auf der x-Achse und von yMin bis yMax auf der y-Achse. Der Standardwert für xMin ist -10. Der Standardwert für xMax ist 10,',
        ({ getParameter, getNullableParameter, typeError, runtimeError, context }): Cartesian2DGraphic => {
            const functions = getParameter('f') as FunctionNode[];
            const xMinNode = getParameter('xMin', createNumberNode(-10)) as NumberNode;
            const xMaxNode = getParameter('xMax', createNumberNode(10)) as NumberNode;
            const yMinNode = getNullableParameter('yMin') as NumberNode | null;
            const yMaxNode = getNullableParameter('yMax') as NumberNode | null;
            const xMin = Math.min(xMinNode.value, xMaxNode.value);
            const xMax = Math.max(xMinNode.value, xMaxNode.value);

            functions.forEach((func, index) => {
                if (func.header.length !== 1 || !['number', 'any'].includes(func.header.at(0).type)) {
                    throw typeError(`invalid function signature in function #${index + 1}`);
                }
            });

            if (xMin === xMax) {
                throw runtimeError('xMax must be greater than xMin');
            }

            const lines: Line2D[] = functions
                .flatMap((func, index) => ({
                    lines: scanFunction(func, xMin, xMax, context),
                    style: (index % 2 === 0 ? 'dashed' : 'solid') as Line2D['style'],
                }))
                .flatMap(({ lines, style }) =>
                    lines.map((points) => ({
                        type: 'line',
                        style,
                        points,
                    })),
                );

            let yMin = yMinNode
                ? yMinNode.value
                : lines
                      .flatMap((x) => x.points)
                      .map((point) => point.y)
                      .reduce((a, b) => Math.min(a, b));
            let yMax = yMaxNode
                ? yMaxNode.value
                : lines
                      .flatMap((x) => x.points)
                      .map((point) => point.y)
                      .reduce((a, b) => Math.max(a, b));

            const height = yMax - yMin;
            if (height === 0) {
                yMax = yMax + DEFAULT_HEIGHT / 2;
                yMin = yMin - DEFAULT_HEIGHT / 2;
            }

            const bottomPadding = Math.max(0, yMin);
            const topPadding = Math.abs(Math.min(yMax, 0));

            const result: GraphicNode = {
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
                lines,
            };
            return result;
        },
    );

export default functionPlotFragment;
