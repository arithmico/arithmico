import { calculateNVar, calculateVar } from './var';

export function calculateSd(xs: number[]): number {
    return Math.sqrt(calculateVar(xs));
}

export function calculateNSd(xs: number[]): number {
    return Math.sqrt(calculateNVar(xs));
}
