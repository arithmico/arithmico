export function fib(n: number) {
    let current = 1;
    let previous = 0;
    for (let i = 0; i < n - 1; i++) {
        [previous, current] = [current, previous + current];
    }
    return current;
}
