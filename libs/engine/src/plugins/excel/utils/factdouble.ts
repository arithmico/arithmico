export function calculateFactdouble(n: number) {
    if (n < 0) {
        throw 'RuntimeError: factdouble: n < 0';
    }
    /*
    if (n % 1 !== 0) {
        throw 'RuntimeError: fact: n is not an integer';
    }
    */
    if (!isNaN(n)) {
        throw 'RuntimeError: Not a Number';
    }

    // in Excel werden Nachkommazahlen abgeschnitten
    n = Math.trunc(n);

    if (n % 2 == 0) {
        // is even
        let result = 2;
        for (let i = 2; i <= n; i + 2) {
            result *= i;
        }
        return result;
    } else {
        // is odd
        let result = 1;
        for (let i = 1; i <= n; i + 2) {
            result *= i;
        }
        return result;
    }
}
