import evaluate from '..';
import { Context, Options, TextResult } from '../types';
import { createContext, createOptions } from './context-utils';

let lastId = 0;

const testOptions = createOptions();

export function createTestContext(stack: Context['stack'], options: Options = testOptions): Context {
    return createContext({ stack, options });
}

export function integrationTest(input: string, expectedOutput: string, context?: Context) {
    test(`integration test #${++lastId}: ${input}`, () => {
        const result = evaluate(input, context);
        if (result.type === 'error') {
            throw result.error;
        }
        expect((<TextResult>result).text).toBe(expectedOutput);
    });
}

export function integrationTestNotThrow(input: string, context?: Context) {
    test(`integration test (not throw) #${++lastId}: ${input}`, () => {
        expect(evaluate(input, context).type).not.toStrictEqual('error');
    });
}

export function integrationTestThrow(input: string, context?: Context) {
    test(`integration test (throw) #${++lastId}: ${input}`, () => {
        expect(evaluate(input, context).type).toStrictEqual('error');
    });
}
