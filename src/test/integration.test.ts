import evaluate, { init } from '..';
import createNumberNode from '../create/NumberNode';
import { Context, Options } from '../types';

init();

const testOptions: Options = {
    decimalPlaces: 6,
    decimalSeparator: '.',
    magnitudeThresholdForScientificNotation: 6,
};

function createTestContext(stack: Context['stack'], options: Options = testOptions): Context {
    return {
        stack,
        options,
    };
}

let lastId = 0;

function integrationTest(input: string, expectedOutput: string, context?: Context) {
    test(`integration test #${++lastId}`, () => {
        expect(evaluate(input, context).result).toBe(expectedOutput);
    });
}

function integrationTestThrow(input: string) {
    test(`integration test #${++lastId}`, () => {
        expect(() => evaluate(input)).toThrow();
    });
}

integrationTest('1', '1');
integrationTest('[1,2,3]', '[1, 2, 3]');
integrationTest('1 + 2', '3');
integrationTest('1 - 2', '-1');
integrationTest('-2', '-2');
integrationTest('--2', '2');
integrationTest('2 * 3', '6');
integrationTest('4 / 2', '2');
integrationTest('2 ^ 3', '8');
integrationTest('true & false', 'false');
integrationTest('true & true', 'true');
integrationTest('true | false', 'true');
integrationTest('false | false', 'false');
integrationTest('-true', 'false');
integrationTest('2 < 3 < 4', 'true');
integrationTest('2 < 3 < 3', 'false');
integrationTest('1 < 2 <= 2 = 2 >= 2 > 1', 'true');
integrationTest('2 + 3 * 4 ^ 5 / 32 = 98', 'true');
integrationTest('10 / 2 / 5', '1');
integrationTest('10 - 5 - 3 - 2', '0');
integrationTest('[[1, 2], 3] + [[3, 2], 1]', '[[4, 4], 4]');
integrationTest('[[3,2,1],[1,0,2]]*[[1,2],[0,1],[4,0]]', '[[7, 8], [9, 2]]');
integrationTest('[1,2,3]*[3,2,1]', '10');
integrationTest('[[1,0],[0,1]]*[4,5]', '[4, 5]');
integrationTest('[4,5]*[[1,0],[0,1]]', '[4, 5]');
integrationTest(
    'a + 1',
    '42',
    createTestContext([
        {
            a: createNumberNode(41),
        },
    ]),
);
integrationTest('sin(pi)', '0');
integrationTest('sin(pi/2)', '1');
integrationTest('((x)->x^2)(2)', '4');
integrationTest('((x: number) -> x+1)(3)', '4');
integrationTest('((x: number) -> x) + ((y: number) -> y^2)', '(x: number) → x + x^2');
integrationTest('((x: number) -> x) + ((x: number) -> x^2)', '(x: number) → x + x^2');
integrationTest('nsolve(sin(x)=0) * 1/ pi', '[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]');
integrationTest('nsolve(1/x=0)', '[]');
integrationTest('lsolve(2*x+3*y=-6, -3*x-4*y=7)', '[x = 3, y = -4]');
integrationTest('lsolve(x=2, x=3-y)', '[x = 2, y = 1]');

integrationTestThrow('1 + true');
integrationTestThrow('2 + [1,2,3]');
integrationTestThrow('2 ^ 3 ^ 4');
integrationTestThrow('4 * true');
integrationTestThrow('2 * -2');
integrationTestThrow('[[1,2],3]+[1,2,3]');
integrationTestThrow('[1,2]+[1,2,3]');
integrationTestThrow('(-1)^2.1');
integrationTestThrow('lsolve(x+y=1,2*x+2*y=1)');
