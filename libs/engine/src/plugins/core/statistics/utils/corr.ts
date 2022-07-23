import { calculateCovariance } from './covariance';
import { calculateSd } from './sd';

export function calculateCorrelationCoefficient(xs: number[], ys: number[]): number {
    return calculateCovariance(xs, ys) / (calculateSd(xs) * calculateSd(ys));
}
