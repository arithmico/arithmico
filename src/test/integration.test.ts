import evaluate from '..';
import createNumberNode from '../create/NumberNode';
import { Context, Options } from '../types';

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
        expect(evaluate(input, context)).toBe(expectedOutput);
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
integrationTest(
    'a + 1',
    '42',
    createTestContext([
        {
            a: {
                type: 'value',
                value: createNumberNode(41),
            },
        },
    ]),
);
integrationTest('[[3,2,1],[1,0,2]]*[[1,2],[0,1],[4,0]]', '[[7, 8], [9, 2]]');

integrationTestThrow('1 + true');
integrationTestThrow('2 + [1,2,3]');
integrationTestThrow('2 ^ 3 ^ 4');
integrationTestThrow('4 * true');
integrationTestThrow('2 * -2');
integrationTestThrow('[[1,2],3]+[1,2,3]');
integrationTestThrow('[1,2]+[1,2,3]');
