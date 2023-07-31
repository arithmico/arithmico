import createFunctionCall from '../../../../node-operations/create-node/create-function-call';
import createNumberNode from '../../../../node-operations/create-node/create-number-node';
import evaluate from '../../../../node-operations/evaluate-node';
import { Context, FunctionNode, Point2D } from '../../../../types';

const PLOT_RESOLUTION = 1000;
const DELTA_COEFFICIENT = 0.15;

function splitLineAtJump(line: Point2D[]): Point2D[][] {
    const minY = line.reduce((acc, val) => Math.min(acc, val.y), line.at(0).y);
    const maxY = line.reduce((acc, val) => Math.max(acc, val.y), line.at(0).y);
    const maxDellta = Math.abs(minY - maxY);
    const result: Point2D[][] = [];
    let currentLine: Point2D[] = [line.at(0)];

    for (let i = 1; i < line.length; i++) {
        const delta = Math.abs(line.at(i - 1).y - line.at(i).y);
        if (delta > DELTA_COEFFICIENT * maxDellta && currentLine.length > 0) {
            result.push(currentLine);
            currentLine = [];
        }
        currentLine.push(line.at(i));
    }
    if (currentLine.length > 0) {
        result.push(currentLine);
    }

    return result;
}

export function scanFunction(f: FunctionNode, xMin: number, xMax: number, context: Context) {
    const lines: Point2D[][] = [];
    let currentLine: Point2D[] = [];
    let errorCount = 0;

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
            errorCount++;
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

    if (errorCount === PLOT_RESOLUTION) {
        throw `plot: the function could not be evaluated in the given interval`;
    }

    return lines.flatMap((line) => splitLineAtJump(line));
}
