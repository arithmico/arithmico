import { Context, Options } from '../../types';
import { parse } from '../../parse/parser';
import normalize from '../../normalize';
import serialize from '../../serialize';

const testOptions: Options = {
    decimalPlaces: 6,
    decimalSeparator: '.',
    magnitudeThresholdForScientificNotation: 6,
};

const testContext: Context = {
    options: testOptions,
    stack: [{}],
};

let lastId = 0;

function normalizeTest(input: string, expectedOutput: string, context: Context = testContext) {
    test(`normalize integration test #${++lastId}`, () => {
        const node = parse(input, testOptions);
        const normalizedNode = normalize(node, context);
        expect(serialize(normalizedNode, context.options)).toBe(expectedOutput);
    });
}

normalizeTest('42', '42');
normalizeTest('true', 'true');
normalizeTest('x', 'x');
normalizeTest('x + 2', '2 + x');
normalizeTest('2 + 2', '4');
normalizeTest('2 - x + 3', '5 + (-x)');
normalizeTest('(a + b) * c', 'a * c + b * c');
normalizeTest('a * (b + c)', 'a * b + a * c');
normalizeTest('(a - b) * c', 'a * c + (-b * c)');
normalizeTest('a * (b - c)', 'a * b + (-a * c)');
normalizeTest('2 * a * 4', '8 * a');
normalizeTest('x^2 * x', 'x^3');
normalizeTest('x * x^2', 'x^3');
normalizeTest('x*y*x*y', 'x^2 * y^2');
normalizeTest('x * x', 'x^2');
normalizeTest('x^2 * x^3', 'x^5');
