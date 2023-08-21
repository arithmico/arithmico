import {calculateErf} from './erf';

export function calculateNormal(x: number, mean: number, standardDeviation: number): number {
    return Math.exp(-Math.pow((x - mean) / standardDeviation, 2) / 2) / (standardDeviation * Math.SQRT2 * Math.sqrt(Math.PI));
}

export function calculateCNormal(x: number, mean: number, standardDeviation: number): number {
    return (1 + calculateErf((x - mean) / (standardDeviation * Math.SQRT2))) / 2;
}
