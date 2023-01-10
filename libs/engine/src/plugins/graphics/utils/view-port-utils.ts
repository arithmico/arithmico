import { Limits } from '../../../types';

const tickSizes = [1 / 2, 5 / 2, 10 / 3, 2, 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 8];

function getMagnitude(x: number) {
    return x === 0 ? 1 : Math.floor(Math.log10(x));
}

function getXTicks(width: number, preferredTickCount = 14) {
    const magnitude = getMagnitude(width);

    return tickSizes
        .map((tickSize) => ({
            tickSize: Math.pow(10, magnitude) * tickSize,
        }))
        .map(({ tickSize }) => ({
            tickSize,
            tickCount: width / tickSize,
        }))
        .sort((a, b) => Math.abs(a.tickCount - preferredTickCount) - Math.abs(b.tickCount - preferredTickCount))[0]
        .tickSize;
}

function getYTicks(height: number, xTicks: number) {
    const magnitude = getMagnitude(height);

    return tickSizes
        .map((tickSize) => ({ tickSize: Math.pow(10, magnitude) * tickSize }))
        .map(({ tickSize }) => ({ tickSize, aspectRatio: tickSize / Math.SQRT2 / xTicks }))
        .map(({ tickSize, aspectRatio }) => ({ tickSize, maxAspectRatio: Math.max(aspectRatio, 1 / aspectRatio) }))
        .sort((a, b) => a.maxAspectRatio - b.maxAspectRatio)[0].tickSize;
}

export function getLimitsAndTicks(xMin: number, yMin: number, xMax: number, yMax: number) {
    const width = xMax - xMin;
    const height = yMax - yMin;
    const xTicks = getXTicks(width);
    const yTicks = getYTicks(height, xTicks);

    return {
        limits: [xMin, yMin, xMax, yMax] as Limits,
        xTicks,
        yTicks,
    };
}
