function calculateT(x: number): number {
    return 1 / (1 + 0.5 * Math.abs(x));
}

function calculateTau(x: number): number {
    const t = calculateT(x);
    return (
        t *
        Math.exp(
            -Math.pow(x, 2) -
                1.26551223 +
                1.00002368 * t +
                0.37409196 * Math.pow(t, 2) +
                0.09678418 * Math.pow(t, 3) -
                0.18628806 * Math.pow(t, 4) +
                0.27886807 * Math.pow(t, 5) -
                1.13520398 * Math.pow(t, 6) +
                1.48851587 * Math.pow(t, 7) -
                0.82215223 * Math.pow(t, 8) +
                0.17087277 * Math.pow(t, 9),
        )
    );
}

export function calculateErf(x: number): number {
    if (x >= 0) {
        return 1 - calculateTau(x);
    }
    return calculateTau(-x) - 1;
}
