const defaultAccuracy = 1e-13;

export function closeTo(a: number, b: number, accuracy: number = defaultAccuracy): boolean {
    return Math.abs(a - b) <= accuracy;
}

export function reduceFraction(numerator: number, denominator: number): [number, number] {
    const gcd = greatestCommonDivisor(numerator, denominator);
    return [Math.round(numerator / gcd), Math.round(denominator / gcd)];
}

function greatestCommonDivisor(numerator: number, denominator: number): number {
    let a = numerator;
    let b = denominator;

    if (a === 0) {
        return b;
    }

    while (b !== 0) {
        const h = a % b;
        a = b;
        b = h;
    }
    return a;
}
