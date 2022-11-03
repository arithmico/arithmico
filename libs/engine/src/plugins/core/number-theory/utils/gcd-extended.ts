export function extendedEuclideanGreatestCommonDivisor(a: number, b: number): [number, number, number] {
    let [rOld, r] = [a, b];
    let [sOld, s] = [1, 0];
    let [tOld, t] = [0, 1];

    while (r !== 0) {
        const quotient = rOld / r;
        [rOld, r] = [r, rOld - quotient * r];
        [sOld, s] = [s, sOld - quotient * s];
        [tOld, t] = [t, tOld - quotient * t];
    }
    return [rOld, sOld, tOld];
}
