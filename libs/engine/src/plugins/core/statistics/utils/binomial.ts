import { binco } from '../../../../utils/binco';

export function checkP(functionName: string, p: number) {
    if (p < 0 || p > 1) {
        throw `RuntimeError: ${functionName}: p is not between 0 and 1`;
    }
}

export function checkNK(functionName: string, n: number, k: number) {
    if (k < 0) {
        throw `RuntimeError: ${functionName}: k < 0`;
    }
    if (n < 0) {
        throw `RuntimeError: ${functionName}: n < 0`;
    }
    if (n < k) {
        throw `RuntimeError: ${functionName}: n < k`;
    }
}

export function checkNPK(functionName: string, n: number, p: number, k: number) {
    checkP(functionName, p);
    checkNK(functionName, n, k);
}

export function calculateBinom(n: number, p: number, k: number) {
    checkNPK('binom', n, p, k);
    return binco(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

export function calculateCBinom(n: number, p: number, k: number) {
    checkNPK('cbinom', n, p, k);
    let result = 0;
    for (let i = 0; i <= k; i++) {
        result += calculateBinom(n, p, i);
    }
    return result;
}
