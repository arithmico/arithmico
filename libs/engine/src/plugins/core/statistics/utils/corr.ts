import { calculateCovariance } from './covariance';
import { calculateUnbiasedStandardDeviation } from './sd';

export function calculateCorrelationCoefficient(xs: number[], ys: number[]): number {
    return (
        calculateCovariance(xs, ys) / (calculateUnbiasedStandardDeviation(xs) * calculateUnbiasedStandardDeviation(ys))
    );
}
