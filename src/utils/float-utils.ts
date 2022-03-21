const defaultAccuracy = 1e-13;

export function closeTo(a: number, b: number, accuracy: number = defaultAccuracy): boolean {
    return Math.abs(a - b) <= accuracy;
}
