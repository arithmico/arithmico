import {
    compareMonomialsDegreeEqual,
    compareMonomialsDegreeGreater,
    compareMonomialsDegreeSmaller,
    Constant,
    haveMonomialsSameBase,
    NonConstant,
    Polynomial,
    sortMonomialsByDegree,
} from '../../../../utils/polynomial-type-utils';

export function getDegreeFromPolynomial(p: Polynomial): number {
    const highestMonomial = p.sort(sortMonomialsByDegree)[0];

    if (highestMonomial === null) {
        throw "RuntimeError: internally Polynomial isn't correct!";
    }

    if (highestMonomial.type === 'constant') {
        return 0;
    } else {
        return highestMonomial.degree;
    }
}

export function calculatePolynomialDash(p: Polynomial, q: Polynomial, minus = false): Polynomial {
    const result: Polynomial = [];

    let copyP = p.slice();
    let copyQ = q.slice();

    while (copyP.length > 0 && copyQ.length > 0) {
        const latestElementP = copyP.at(-1);
        const latestElementQ = copyQ.at(-1);

        if (compareMonomialsDegreeGreater(latestElementP, latestElementQ)) {
            result.push(copyP.pop());
            continue;
        }

        if (compareMonomialsDegreeSmaller(latestElementP, latestElementQ)) {
            result.push(copyQ.pop());
            continue;
        }

        if (
            compareMonomialsDegreeEqual(latestElementP, latestElementQ) &&
            haveMonomialsSameBase(latestElementP, latestElementQ)
        ) {
            if (latestElementP.type === 'monomial') {
                result.push(<NonConstant>{
                    type: 'monomial',
                    coefficient: minus
                        ? latestElementP.coefficient - latestElementQ.coefficient
                        : latestElementP.coefficient + latestElementQ.coefficient,
                    base: (<NonConstant>latestElementP).base,
                    degree: (<NonConstant>latestElementP).degree,
                });
            }
            if (latestElementP.type === 'constant') {
                result.push(<Constant>{
                    type: 'constant',
                    coefficient: minus
                        ? latestElementP.coefficient - latestElementQ.coefficient
                        : latestElementP.coefficient + latestElementQ.coefficient,
                });
            }
            copyP.pop();
            copyQ.pop();
            continue;
        }

        if (
            compareMonomialsDegreeEqual(latestElementQ, latestElementQ) &&
            !haveMonomialsSameBase(latestElementP, latestElementQ)
        ) {
            copyQ = copyQ.filter((m) => {
                if (haveMonomialsSameBase(latestElementP, m) && compareMonomialsDegreeEqual(latestElementP, m)) {
                    result.push(<NonConstant>{
                        type: 'monomial',
                        coefficient: minus
                            ? latestElementP.coefficient - m.coefficient
                            : latestElementP.coefficient + m.coefficient,
                        base: (<NonConstant>m).base,
                        degree: (<NonConstant>m).degree,
                    });
                    copyP.pop();
                    return false;
                } else {
                    return true;
                }
            });
        }
    }

    if (copyP.length !== 0) {
        return result.concat(copyP).sort(sortMonomialsByDegree);
    }
    if (copyQ.length !== 0) {
        return result.concat(copyQ).sort(sortMonomialsByDegree);
    }
    return result.sort(sortMonomialsByDegree);
}

export function calculatePolynomialMultiplication(p: Polynomial, q: Polynomial) {
    return [<Constant>{ type: 'constant', coefficient: 0 }];
    const multiplicatedPolynomials = [];

    p.forEach((m) => {
        return null;
    });
}
