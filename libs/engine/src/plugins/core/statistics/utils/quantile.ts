export function calculateQuantile(p: number, xs: number[]): number {
    // uses C = 0 version
    const arr: number[] = xs.slice(0).sort((a, b) => a - b);
    const N = arr.length;

    const p_1 = 1 / (N + 1);
    const p_N = N / (N + 1);

    let index: number;
    if (p <= p_1) {
        index = 1;
    } else if (p_1 < p && p < p_N) {
        index = p * (N + 1);
    } else {
        index = N;
    }

    return arr[Math.floor(index) - 1] + (index % 1) * (arr[Math.floor(index)] - arr[Math.floor(index) - 1]);
}
/*
function quantileC1_2(p: number, xs: number[]) {
    const arr: number[] = xs.slice(0).sort((a, b) => a - b);
    const N = arr.length;

    const p_1 = 1 / (2 * N);
    const p_N = (2 * N - 1) / (2 * N);

    let index: number;
    if (p_1 <= p && p <= p_N) {
        index = N * p + 1 / 2;
    } else if (p <= p_1) {
        index = 1;
    } else {
        index = N;
    }

    return arr[Math.floor(index) - 1] + (index % 1) * (arr[Math.floor(index)] - arr[Math.floor(index) - 1]);
}

function quantileC1(p: number, xs: number[]): number {
    const arr: number[] = xs.slice(0).sort((a, b) => a - b);
    const index = p * (arr.length - 1) + 1;

    return arr[Math.floor(index) - 1] + (index % 1) * (arr[Math.floor(index)] - arr[Math.floor(index) - 1]);
}
 */
