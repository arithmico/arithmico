import evaluate from '..';
import { Context, Options } from '../types';

let lastId = 0;

const testOptions: Options = {
    decimalPlaces: 6,
    decimalSeparator: '.',
    magnitudeThresholdForScientificNotation: 6,
    angleUnit: 'degrees',
};

export function createTestContext(stack: Context['stack'], options: Options = testOptions): Context {
    return {
        stack,
        options,
    };
}

export function integrationTest(input: string, expectedOutput: string, context?: Context) {
    test(`integration test #${++lastId}`, () => {
        expect(evaluate(input, context).result).toBe(expectedOutput);
    });
}

export function integrationTestThrow(input: string, context?: Context) {
    test(`integration test (throw) #${++lastId}`, () => {
        expect(() => evaluate(input, context)).toThrow();
    });
}
