import { integrationTest, integrationTestThrow } from '../../utils/integration-test-utils';

// normal
integrationTest('normal(0.23)', '0.388529');
integrationTest('normal(-0.23)', '0.388529');

// cnormal
integrationTest('cnormal(0.23)', '0.590954');
integrationTest('cnormal(-0.23)', '0.409046');

// binom
integrationTest('binom(10, 0.87, 9)', '0.371207');
integrationTestThrow('binom(-10, 0.87, 9)');
integrationTestThrow('binom(10, 0.87, -9)');
integrationTestThrow('binom(10.5, 0.87, 9)');
integrationTestThrow('binom(10, 0.87, 9.5)');
integrationTestThrow('binom(10, 1.87, 9)');
integrationTestThrow('binom(10, -0.87, 9)');

// cbinom
integrationTest('cbinom(10, 0.87, 9)', '0.751577');
integrationTestThrow('cbinom(-10, 0.87, 9)');
integrationTestThrow('cbinom(10, 0.87, -9)');
integrationTestThrow('cbinom(10.5, 0.87, 9)');
integrationTestThrow('cbinom(10, 0.87, 9.5)');
integrationTestThrow('cbinom(10, 1.87, 9)');
integrationTestThrow('cbinom(10, -0.87, 9)');

// avg
integrationTest('avg(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5)', '9');

// var
integrationTest('var(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5)', '10');

// unbiased:var
integrationTest('unbiased:var(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5)', '11');

// sd
integrationTest('sd(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5)', '3.162278');

// unbiased:sd
integrationTest('unbiased:sd(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5)', '3.316625');

// median
integrationTest('median(3, 13, 7, 5, 21, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29)', '23');
integrationTest('median(2, 3, 4, 5)', '3.5');
integrationTestThrow('median(2)');
integrationTestThrow('median(1, 3, a)');

// quantile
integrationTest('quantile(0.25, [6, 1, 3, 8, 4, 5, 2, 7, 9])', '2.5');
integrationTest('quantile(0.75, [1, 2, 2, 3, 5, 8, 9, 12, 12, 13])', '12');
integrationTestThrow('quantile(0.8, [2])');
integrationTestThrow('quantile(0.8, [2, a, 4, 5])');
integrationTestThrow('quantile(-0.8, [2, 3, 4, 5])');

// cov
integrationTest('cov([18, 2, 42, 14, 22, 35, 45, 8], [22, 10, 53, 30, 25, 36, 45, 13])', '222.928571');
integrationTestThrow('cov([18, 42, 14, 22, 35, 45, 8], [22, 10, 53, 30, 25, 36, 45, 13])');
integrationTestThrow('cov([18, a, 42, 14, 22, 35, 45, 8], [22, 10, 53, 30, 25, 36, 45, 13])');
integrationTestThrow('cov([18, 2, 42, 14, 22, 35, 45, 8], [22, b, 53, 30, 25, 36, 45, 13])');

// corr
integrationTest(
    'corr([10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5], [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68])',
    '0.816421',
);
integrationTestThrow('corr([18, 42, 14, 22, 35, 45, 8], [22, 10, 53, 30, 25, 36, 45, 13])');
integrationTestThrow('corr([18, a, 42, 14, 22, 35, 45, 8], [22, 10, 53, 30, 25, 36, 45, 13])');
integrationTestThrow('corr([18, 2, 42, 14, 22, 35, 45, 8], [22, b, 53, 30, 25, 36, 45, 13])');

// erf
integrationTest('erf(1)', '0.842701');
integrationTest('erf(-1)', '-0.842701');
