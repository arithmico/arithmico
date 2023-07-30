export function calculateAvg(xs: number[]) {
    return xs.map((x) => x / xs.length).reduce((a, b) => a + b, 0);
}
