export function calculateQuantile(p: number, xs: number[]): number {
    const arr: number[] = xs.slice(0).sort((a, b) => a - b);
    const expValue: number = arr.length * p;

    return expValue % 1 === 0
        ? (arr[expValue / 2] + arr[expValue / 2 + 1]) / 2
        : (arr[Math.floor(expValue)] + arr[Math.floor(expValue + 1)]) / 2;
}
