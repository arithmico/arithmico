import { createTestContext, integrationTest, integrationTestThrow } from '../../../utils/integration-test-utils';
import { createOptions } from '../../../utils/context-utils';
import { getDefaultContext } from '../../../index';

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
