import { calculateVar } from './var';

export function calculateSd(xs: number[]): number {
    return Math.sqrt(calculateVar(xs));
}
