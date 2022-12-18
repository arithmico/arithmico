import { Context } from '../../types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { parse } from '@arithmico/parser';
import normalize from '../../node-operations/normalize-node';
import serialize from '../../node-operations/serialize-node';
import globalConsole from 'console';
import { createContext } from '../../utils/context-utils';

beforeEach(() => {
    global.console = globalConsole;
});

const testContext = createContext();

let lastId = 0;

function normalizeTest(input: string, expectedOutput: string, context: Context = testContext) {
    test(`normalize integration test #${++lastId}`, () => {
        const node = parse(input, { language: 'en' });
        const normalizedNode = normalize(node, context);
        expect(serialize(normalizedNode, context.options)).toBe(expectedOutput);
    });
}

normalizeTest('42', '42');
normalizeTest('true', 'true');
normalizeTest('x', 'x');
normalizeTest('x^1', 'x');
normalizeTest('x^2', 'x^2');
normalizeTest('x + 2', '2 + x');
normalizeTest('2 + 2', '4');
normalizeTest('a + b + c', 'a + b + c');
normalizeTest('a + b + c + 1', '1 + a + b + c');
normalizeTest('a * b * c * 2', '2 * a * b * c');
normalizeTest('2 - x + 3', '5 + (-1) * x');
normalizeTest('(a + b) * c', 'a * c + b * c');
normalizeTest('a * (b + c)', 'a * b + a * c');
normalizeTest('(a - b) * c', 'a * c + (-1) * b * c');
normalizeTest('a * (b - c)', 'a * b + (-1) * a * c');
normalizeTest('2 * a * 4', '8 * a');
normalizeTest('x^2 * x', 'x^3');
normalizeTest('x * x^2', 'x^3');
normalizeTest('x*y*x*y', 'x^2 * y^2');
normalizeTest('x * x', 'x^2');
normalizeTest('x^2 * x^3', 'x^5');
normalizeTest('x^n * x^m', 'x^(n + m)');
normalizeTest('x^0', '1');
normalizeTest('3 * x^0', '3');
normalizeTest('2 + 3 * x^0', '5');
normalizeTest('2 + 3', '5');
normalizeTest('2 * 3', '6');
normalizeTest('2 / 4', '0.5');
normalizeTest('(x*x)/(y*y)', 'x^2 * y^(-2)');
normalizeTest('(a + b) / c', 'a * c^(-1) + b * c^(-1)');
normalizeTest('(a - b) / c', 'a * c^(-1) + (-1) * b * c^(-1)');
normalizeTest('(-(-a))', 'a');
normalizeTest('a / (c / b)', 'a * b * c^(-1)');
normalizeTest('1 * x^2', 'x^2');
normalizeTest('x^2 * 1', 'x^2');
normalizeTest('1 / x^2', 'x^(-2)');
normalizeTest('1 / (x*y*z)', 'x^(-1) * y^(-1) * z^(-1)');
normalizeTest('1 / (x^2*y^3*z^4)', 'x^(-2) * y^(-3) * z^(-4)');
normalizeTest('(x^2 / x^3 + x + x^2)/x^2', '1 + x^(-3) + x^(-1)');
normalizeTest('x^2 + x^2', '2 * x^2');
normalizeTest('x^2 - x^2', '0');
normalizeTest('x^2 + 2 * x^2', '3 * x^2');
normalizeTest('2 * x^2 + 3 * x^2', '5 * x^2');
normalizeTest('x^2 * y - 3 * y * x^2', '(-2) * y * x^2');
normalizeTest('x^2 = x', 'x^2 + (-1) * x = 0');
normalizeTest('x = 0', 'x = 0');
