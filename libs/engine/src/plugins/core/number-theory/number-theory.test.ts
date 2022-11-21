import { integrationTest, integrationTestThrow } from '../../../utils/integration-test-utils';

// prime:range
integrationTest('prime:range(2)', '[2]');
integrationTest('prime:range(10)', '[2, 3, 5, 7]');
integrationTest('prime:range(23)', '[2, 3, 5, 7, 11, 13, 17, 19, 23]');
integrationTestThrow('prime:range(1.3)');
integrationTestThrow('prime:range(1)');
integrationTestThrow('prime:range(-1)');

// prime:nth
integrationTest('prime:nth(1)', '2');
integrationTest('prime:nth(2)', '3');
integrationTest('prime:nth(200)', '1223');
integrationTestThrow('prime:nth(0)');
integrationTestThrow('prime:nth(1.3)');
integrationTestThrow('prime:nth(-1)');

// prime:is
integrationTest('prime:is(2)', 'true');
integrationTest('prime:is(6)', 'false');
integrationTest('prime:is(1223)', 'true');
integrationTest('prime:is(1)', 'false');
integrationTest('prime:is(1.3)', 'false');
integrationTest('prime:is(-1)', 'false');

// prime:pi
integrationTest('prime:pi(2)', '1');
integrationTest('prime:pi(100)', '25');
integrationTest('prime:pi(1223)', '200');
integrationTestThrow('prime:pi(1.3)');
integrationTestThrow('prime:pi(1)');
integrationTestThrow('prime:pi(-1)');

// gcd
integrationTest('gcd(4, 12)', '4');
integrationTest('gcd(12, 4)', '4');
integrationTest('gcd(63, 22)', '1');
integrationTest('gcd(22, 63)', '1');
integrationTestThrow('gcd(-1, 5)');
integrationTestThrow('gcd(1, -5)');
integrationTestThrow('gcd(1.5, 5)');
integrationTestThrow('gcd(1, 5.2)');

// gcdExtended
integrationTest('gcdExtended(4, 12)', '4 = 1 * 4 + 0 * 12');
integrationTest('gcdExtended(12, 4)', '4 = 0 * 12 + 1 * 4');
integrationTest('gcdExtended(12, 6)', '6 = 0 * 12 + 1 * 6');
integrationTest('gcdExtended(6, 12)', '6 = 1 * 6 + 0 * 12');
integrationTest('gcdExtended(12, 8)', '4 = 1 * 12 + (-1) * 8');
integrationTest('gcdExtended(8, 12)', '4 = (-1) * 8 + 1 * 12');
integrationTest('gcdExtended(63, 22)', '1 = 7 * 63 + (-20) * 22');
integrationTest('gcdExtended(22, 63)', '1 = (-20) * 22 + 7 * 63');
integrationTestThrow('gcdExtended(-1, 5)');
integrationTestThrow('gcdExtended(1, -5)');
integrationTestThrow('gcdExtended(1.5, 5)');
integrationTestThrow('gcdExtended(1, 5.2)');

// lcm
integrationTest('lcm(12, 18)', '36');
integrationTest('lcm(6, 7)', '42');
integrationTestThrow('lcm(1, -5)');
integrationTestThrow('lcm(1.5, 5)');

// coprime
integrationTest('coprime(12, 77)', 'true');
integrationTest('coprime(4, 12)', 'false');
integrationTestThrow('coprime(1, 5.2)');
integrationTestThrow('coprime(1, -5)');

// euler:phi
integrationTest('euler:phi(1)', '1');
integrationTest('euler:phi(2)', '1');
integrationTest('euler:phi(10)', '4');
integrationTest('euler:phi(72)', '24');
integrationTest('euler:phi(100)', '40');
integrationTestThrow('prime:pi(1.3)');
integrationTestThrow('prime:pi(-1)');
