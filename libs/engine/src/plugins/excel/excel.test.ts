import { integrationTest, integrationTestThrow } from '../../utils/integration-test-utils';

// constants
integrationTest('excel:five', '5');

// wurzel
integrationTest('wurzel(9)', '3');
integrationTestThrow('wurzel(-1)');

// xoder
integrationTest('xoder(true; false)', 'true');
integrationTest('xoder(true; true)', 'false');

// wenn
integrationTest('wenn(true, 1, 2)', '1');
integrationTest('wenn(true, 1+2, 2)', '3');
integrationTest('wenn(false, 1, 2)', '2');

// zweifakultaet
integrationTest('zweifakultaet(9.011)', '945');
integrationTest('zweifakultaet(2)', '2');
integrationTest('zweifakultaet(5)', '15');
integrationTestThrow('zweifakultaet(-1)');
