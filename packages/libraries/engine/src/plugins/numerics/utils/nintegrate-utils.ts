import evaluate from '../../../node-operations/evaluate-node';
import { Context, NumberNode, SyntaxTreeNode } from '../../../types';

const positionWeightPairs = [
    [0.9914553711208126, 0.022935322010529224],
    [0.9491079123427585, 0.06309209262997856],
    [0.8648644233597691, 0.10479001032225019],
    [0.7415311855993945, 0.14065325971552592],
    [0.5860872354676911, 0.1690047266392679],
    [0.4058451513773972, 0.19035057806478542],
    [0.20778495500789848, 0.20443294007529889],
    [0, 0.20948214108472782],
    [-0.20778495500789848, 0.20443294007529889],
    [-0.4058451513773972, 0.19035057806478542],
    [-0.5860872354676911, 0.1690047266392679],
    [-0.7415311855993945, 0.14065325971552592],
    [-0.8648644233597691, 0.10479001032225019],
    [-0.9491079123427585, 0.06309209262997856],
    [-0.9914553711208126, 0.022935322010529224],
];

function mapPositionWeightPairsToInterval(leftLimit: number, rightLimit: number) {
    return positionWeightPairs.map(([x, w]) => [((rightLimit - leftLimit) / 2) * x + (leftLimit + rightLimit) / 2, w]);
}

export function integrateInterval(
    leftLimit: number,
    rightLimit: number,
    expression: SyntaxTreeNode,
    value: NumberNode,
    context: Context,
): number {
    let errors = 0;
    const positionWeightPairs = mapPositionWeightPairsToInterval(leftLimit, rightLimit);
    const values = positionWeightPairs.map(([x, w]) => {
        value.value = x;
        try {
            const result = evaluate(expression, context);

            if (result.type !== 'number') {
                throw '';
            }

            return result.value * w;
        } catch {
            errors++;
            return 0;
        }
    });

    // allows one undefined position per interval
    if (errors > 1) {
        throw 'RuntimeError: unable to integrate function';
    }

    return ((rightLimit - leftLimit) / 2) * values.reduce((a, b) => a + b);
}
