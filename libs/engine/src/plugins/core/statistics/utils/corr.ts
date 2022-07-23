import { calculateCovariance } from './covariance';
import { calculateSd } from './sd';

export function calculateCorrelationCoefficient(x: number[], y: number[]): number {
    return calculateCovariance(x, y) / (calculateSd(x) * calculateSd(y));
}
