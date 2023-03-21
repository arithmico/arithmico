import { createTestContext, integrationTest, integrationTestThrow } from '../../utils/integration-test-utils';
import { createOptions } from '../../utils/context-utils';
import { getDefaultContext } from '../../index';

const defaultStack = getDefaultContext().stack;
const radiansTestContext = createTestContext(defaultStack, createOptions({ angleUnit: 'radians' }));

// nsolve
integrationTest('nsolve(sin(x)=0) * 1/ pi', '[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]', radiansTestContext);
integrationTest('nsolve(sin(x)=0, -180, -1) * 1 / 180', '[-1]');
integrationTest('nsolve(1/x=0)', '[]');
integrationTest('nsolve(x^3 -4*x^2 +3=0)', '[-0.791288, 1, 3.791288]');
integrationTest('nsolve(x^(34)-1234.32323=0)', '[-1.23289, 1.23289]');
integrationTest('nsolve((1+n)*n/2=34)', '[-8.761356, 7.761356]');
integrationTest('nsolve(x^3+x^2-17*x+15=0)', '[-5, 1, 3]');

// nintegrate
integrationTest('nintegrate((x)->x^2,0,1)', '0.333333');
integrationTest('nintegrate((x)->2*x^2,0,1)', '0.666667');
integrationTest('nintegrate((x)->1/x, -1, 1)', '0');
integrationTestThrow('nintegrate((x)->x&true, -1, 1)');

// nderive
integrationTest('nderive((x) -> x^2, 2)', '4');
integrationTest('nderive((x) -> x^2, 2, 1)', '4');
integrationTest('nderive((x) -> x^2, 3, 2)', '2');
integrationTest('nderive((x) -> x^2, pi^2, 2)', '2');
integrationTest('nderive((x) -> x, 0)', '1');
integrationTestThrow('nderive((x) -> 1/x, 0)');
