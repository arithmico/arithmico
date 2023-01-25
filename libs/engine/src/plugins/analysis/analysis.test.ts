import { createTestContext, integrationTest, integrationTestThrow } from '../../utils/integration-test-utils';
import { createOptions } from '../../utils/context-utils';
import { getDefaultContext } from '../../index';

const defaultStack = getDefaultContext().stack;
const radiansTestContext = createTestContext(defaultStack, createOptions({ angleUnit: 'radians' }));

// e
integrationTest('e', '2.718282');

// exp
integrationTest('exp(2)', '7.389056');

// lg
integrationTest('lg(1000)', '3');
integrationTestThrow('lg(-1)');

// ln
integrationTest('ln(exp(2))', '2');
integrationTestThrow('ln(-1)');

// log
integrationTest('log(8,2)', '3');
integrationTestThrow('log(-1, 1)');
integrationTestThrow('log(1, -1)');
integrationTestThrow('log(1, 0)');
integrationTestThrow('log(0, 0)');

// sin
integrationTest('sin(pi)', '0', radiansTestContext);
integrationTest('sin(180)', '0');
integrationTest('sin(pi/2)', '1', radiansTestContext);
integrationTest('sin(90)', '1');

// sqrt
integrationTest('sqrt(4)', '2');
integrationTestThrow('sqrt(-1)');

// root
integrationTest('root(8,3)', '2');
integrationTestThrow('root(-1, 2)');
integrationTestThrow('root(1, -2)');

// table
integrationTest('table((x)->x^2,0,2,1)', '[[0, 0], [1, 1], [2, 4]]');
integrationTest('table((x: number)->x^2,0,2,1)', '[[0, 0], [1, 1], [2, 4]]');
integrationTestThrow('table((x: boolean)->x^2,0,2,1)');

// round
integrationTest('round(0.5)', '1');
integrationTest('round(-0.5)', '0');
integrationTest('round(-0.6)', '-1');
integrationTest('round(3)', '3');
integrationTest('round(0.4)', '0');

// floor
integrationTest('floor(1.1)', '1');
integrationTest('floor(-1.1)', '-2');
integrationTest('floor(2)', '2');

// ceil
integrationTest('ceil(-1.1)', '-1');
integrationTest('ceil(1.2)', '2');
integrationTest('ceil(1)', '1');

// abs
integrationTest('abs(-7)', '7');
integrationTest('abs(7)', '7');

// min
integrationTest('min(-1,1,2,3)', '-1');

// max
integrationTest('max(-1,1,2,3,2,1)', '3');
