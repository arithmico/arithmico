import { calculateBiasedSampleVariance, calculateUnbiasedSampleVariance } from './var';

export function calculateUnbiasedStandardDeviation(xs: number[]): number {
    return Math.sqrt(calculateUnbiasedSampleVariance(xs));
}

export function calculateBiasedStandartDeviation(xs: number[]): number {
    return Math.sqrt(calculateBiasedSampleVariance(xs));
}
