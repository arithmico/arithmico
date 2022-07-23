import { calculateAvg } from './avg';

export function calculateCovariance(xs: number[], ys: number[]): number {
    const meanX = calculateAvg(xs);
    const meanY = calculateAvg(ys);

    return (
        new Array(xs.length)
            .fill(0)
            .map((_, index) => (xs[index] - meanX) * (ys[index] - meanY))
            .reduce((a, b) => a + b) /
        (xs.length - 1)
    );
}
