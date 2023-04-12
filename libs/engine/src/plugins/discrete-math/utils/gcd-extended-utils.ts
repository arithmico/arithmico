import { euclideanDivision } from './euclidean-division';

export function extendedEuclideanGreatestCommonDivisor(a: number, b: number): [number, number, number] {
    if (b === 0) {
        return [a, 1, 0];
    }

    const [gcd, bezoutCoefficientS, bezoutCoefficientT] = extendedEuclideanGreatestCommonDivisor(b, a % b);
    return [gcd, bezoutCoefficientT, bezoutCoefficientS - euclideanDivision(a, b) * bezoutCoefficientT]; // euclidean division
}
