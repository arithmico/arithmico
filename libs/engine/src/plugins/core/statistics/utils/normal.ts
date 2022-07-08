import { calculateErf } from './erf';

export function calculateNormal(x: number): number {
    return Math.exp(Math.pow(x, 2) / 2) / Math.sqrt(2 * Math.PI);
}

export function calculateCNormal(x: number): number {
    return (1 + calculateErf(x / Math.SQRT2)) / 2;
}
