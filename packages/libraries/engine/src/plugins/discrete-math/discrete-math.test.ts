import { integrationTest, integrationTestThrow } from '../../utils/integration-test-utils';

// prime:range
integrationTest('prime:range(1)', '[]');
integrationTest('prime:range(2)', '[2]');
integrationTest('prime:range(10)', '[2, 3, 5, 7]');
integrationTest('prime:range(23)', '[2, 3, 5, 7, 11, 13, 17, 19, 23]');
integrationTestThrow('prime:range(1.3)');
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
integrationTest('gcd:extended(4, 12)', '4 = 1 * 4 + 0 * 12');
integrationTest('gcd:extended(12, 4)', '4 = 0 * 12 + 1 * 4');
integrationTest('gcd:extended(12, 6)', '6 = 0 * 12 + 1 * 6');
integrationTest('gcd:extended(6, 12)', '6 = 1 * 6 + 0 * 12');
integrationTest('gcd:extended(12, 8)', '4 = 1 * 12 + (-1) * 8');
integrationTest('gcd:extended(8, 12)', '4 = (-1) * 8 + 1 * 12');
integrationTest('gcd:extended(63, 22)', '1 = 7 * 63 + (-20) * 22');
integrationTest('gcd:extended(22, 63)', '1 = (-20) * 22 + 7 * 63');
integrationTestThrow('gcd:extended(-1, 5)');
integrationTestThrow('gcd:extended(1, -5)');
integrationTestThrow('gcd:extended(1.5, 5)');
integrationTestThrow('gcd:extended(1, 5.2)');

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
integrationTestThrow('euler:phi(1.3)');
integrationTestThrow('euler:phi(-1)');

// mod
integrationTest('mod(2, 3)', '2');
integrationTest('mod(-2, 3)', '1');
integrationTest('mod(2, -3)', '-1');
integrationTest('mod(-2, -3)', '-2');
integrationTestThrow('mod(3,0)');
integrationTestThrow('mod(-3,0)');

// idiv
integrationTest('idiv(4, 3)', '1');
integrationTest('idiv(-4, 3)', '-1');
integrationTest('idiv(4, -3)', '-1');
integrationTest('idiv(4, 3)', '1');
integrationTestThrow('idiv(3,0)');
integrationTestThrow('idiv(-3,0)');

// binco
integrationTest('binco(5, 0)', '1');
integrationTest('binco(5, 1)', '5');
integrationTest('binco(7,4)', '35');
integrationTestThrow('binco(-3, 5)');
integrationTestThrow('binco(3, -5)');
integrationTestThrow('binco(5, 0.5)');
integrationTestThrow('binco(5.4, 2)');
integrationTestThrow('binco(3, 5)');
integrationTestThrow('binco(2, 3)');

// fact
integrationTest('fact(0)', '1');
integrationTest('fact(1)', '1');
integrationTest('fact(7)', '5040');
integrationTestThrow('fact(-1)');
integrationTestThrow('fact(0.1)');

// fraction
integrationTest('fraction(0)', '0');
integrationTest('fraction(1/3)', '1 / 3');
integrationTest('fraction(1/3+1/3)', '2 / 3');
integrationTest('fraction(1/3-1/3)', '0');
integrationTestThrow('fraction(2/0)');

// mfraction
integrationTest('mfraction(0)', '0');
integrationTest('mfraction(8/3)', '2 + 2 / 3');
integrationTest('mfraction(2/3)', '2 / 3');
integrationTest('mfraction(12/3)', '4');
integrationTestThrow('mfraction(2/0)');

// fib
integrationTest('fib(1)', '1');
integrationTest('fib(2)', '1');
integrationTest('fib(19)', '4181');
integrationTestThrow('fib(0)');
integrationTestThrow('fib(3.5)');
