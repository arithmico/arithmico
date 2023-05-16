import { integrationTest, integrationTestThrow } from '../../utils/integration-test-utils';

// constants
integrationTest('excel:five', '5');

// wurzel
integrationTest('wurzel(9)', '3');
integrationTestThrow('wurzel(-1)');

// xoder
integrationTest('xoder(true)', 'true');
integrationTest('xoder(false)', 'false');
integrationTest('xoder(true, false, false, false, true, false, true)', 'true');
integrationTest('xoder(true, true)', 'false');
integrationTest('xoder(true, false)', 'true');
integrationTestThrow('xoder(42)');

// wenn
integrationTest('wenn(true, 1, 2)', '1');
integrationTest('wenn(true, 1+2, 2)', '3');
integrationTest('wenn(false, 1, 2)', '2');

// zweifakultaet
integrationTest('zweifakultaet(9.011)', '945');
integrationTest('zweifakultaet(0)', '1'); // ist so definiert
integrationTest('zweifakultaet(1)', '1');
integrationTest('zweifakultaet(2)', '2');
integrationTest('zweifakultaet(4)', '8');
integrationTest('zweifakultaet(5)', '15');
integrationTest('zweifakultaet(6)', '48');
integrationTest('zweifakultaet(7)', '105');
integrationTest('zweifakultaet(8)', '384');
integrationTestThrow('zweifakultaet(-1)');

// ungerade
integrationTest('ungerade(1)', '1');
integrationTest('ungerade(1.5)', '3');
integrationTest('ungerade(-1)', '-1');
integrationTest('ungerade(0)', '1');
integrationTest('ungerade(2)', '3');
integrationTest('ungerade(3)', '3');
integrationTest('ungerade(-2)', '-3');
integrationTest('ungerade(-4)', '-5');
integrationTest('ungerade(-2.5)', '-3');
integrationTest('ungerade(-2.1)', '-3');
integrationTest('ungerade(-2.9)', '-3');
integrationTest('ungerade(6)', '7');
integrationTest('ungerade(6.2)', '7');
integrationTest('ungerade(7.2)', '9');
integrationTest('ungerade(7.89)', '9');
integrationTestThrow('ungerade(a)');
