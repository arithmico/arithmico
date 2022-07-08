export function binco(n: number, k: number): number {
    let result = 1;
    if (n < k) {
        throw 'invalid input: n < k';
    }
    while (k > 0) {
        result = result * (n / k);
        n--;
        k--;
    }
    return Math.round(result);
}
