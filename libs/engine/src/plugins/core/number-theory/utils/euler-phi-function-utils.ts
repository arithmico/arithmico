import { greatestCommonDivisor } from '../../../../utils/float-utils';
import { isPrimeNumber } from './prime-number-utils';

export function eulerPhiFunction(n: number) {
    if (isPrimeNumber(n)) {
        return n - 1;
    }

    let result = 0;
    for (let i = 0; i < n; i++) {
        if (greatestCommonDivisor(n, i) === 1) {
            result++;
        }
    }
    return result;
}
