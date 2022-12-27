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
        expect((<TextResult>evaluate(input, context)).text).toBe(expectedOutput);
    });
}

export function integrationTestThrow(input: string, context?: Context) {
    test(`integration test (throw) #${++lastId}: ${input}`, () => {
        expect(evaluate(input, context).type).toStrictEqual('error');
    });
}
