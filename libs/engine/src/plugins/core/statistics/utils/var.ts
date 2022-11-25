import { calculateAvg } from './avg';

export function calculateUnbiasedSampleVariance(xs: number[]): number {
    const avg = calculateAvg(xs);
    return xs.map((x) => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / (xs.length - 1);
}

export function calculateBiasedSampleVariance(xs: number[]): number {
    const avg = calculateAvg(xs);
    return xs.map((x) => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / xs.length;
}