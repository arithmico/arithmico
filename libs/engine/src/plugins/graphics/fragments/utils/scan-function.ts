import createFunctionCall from '../../../../node-operations/create-node/create-function-call';
import createNumberNode from '../../../../node-operations/create-node/create-number-node';
import evaluate from '../../../../node-operations/evaluate-node';
import { Context, FunctionNode, Point2D } from '../../../../types';

const PLOT_RESOLUTION = 1000;

export function scanFunction(f: FunctionNode, xMin: number, xMax: number, context: Context) {
    const lines: Point2D[][] = [];
    let currentLine: Point2D[] = [];

    for (let i = 0; i < PLOT_RESOLUTION; i++) {
        try {
            const x = xMin + ((xMax - xMin) * i) / PLOT_RESOLUTION;
            const yNode = evaluate(createFunctionCall(f, [createNumberNode(x)]), context);
            if (yNode.type !== 'number') {
                throw `invalid return type expected number got ${yNode.type}`;
            }
            if (!Number.isFinite(yNode.value)) {
                throw 'cannot plot infinite values';
            }
            currentLine.push({ x: x, y: yNode.value });
        } catch (error) {
            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = [];
            }
        }
    }
    if (currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = [];
    }

    return lines;
}
