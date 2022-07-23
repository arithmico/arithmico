import {calculateAvg} from './avg';

export function calculateCovariance(x: number[], y: number[]): number {
    const mean_x = calculateAvg(x);
    const mean_y = calculateAvg(y);

    return (
        new Array(x.length)
            .fill(0)
            .map((_, index) => (x[index] - mean_x) * (y[index] - mean_y))
            .reduce((a, b) => a + b) /
        x.length
    );
}
