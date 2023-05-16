export function calculateFactdouble(n: number) {
    if (n < 0) {
        throw 'RuntimeError: factdouble: n < 0';
    }

    if (isNaN(n)) {
        throw 'RuntimeError: Not a Number';
    }

    // in Excel werden Nachkommazahlen abgeschnitten
    n = Math.trunc(n);

    if (n == 0) {
        return 1; // Definition
    } else if (n % 2 == 1) {
        // is odd
        let result = 1;
        for (let i = 1; i <= n; i = i + 2) {
            result *= i;
        }
        return result;
    } else {
        // is even
        let result = 1;
        for (let i = 2; i <= n; i = i + 2) {
            result *= i;
        }
        return result;
    }
}
