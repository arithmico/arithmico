import { binco } from '../../../utils/binco';

export function calculateBinom(n: number, p: number, k: number) {
    return binco(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

export function calculateCBinom(n: number, p: number, k: number) {
    let result = 0;
    for (let i = 0; i <= k; i++) {
        result += calculateBinom(n, p, i);
    }
    return result;
}
