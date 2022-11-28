import { integrationTest, integrationTestThrow } from '../../../utils/integration-test-utils';

// ite
integrationTest('ite(true, 1, 2)', '1');
integrationTest('ite(true, 1+2, 2)', '3');
integrationTest('ite(false, 1, 2)', '2');

// list:filter
integrationTest('list:filter(x->x>=5,[1,2,3,4,5,6,7,8,9,10])', '[5, 6, 7, 8, 9, 10]');
integrationTestThrow('list:filter((x,y)->true, [1,2,3])');
integrationTestThrow('list:filter((x)->x, [1,2,3])');

// list:map
integrationTest('list:map(x->x^2,[1,2,3])', '[1, 4, 9]');
integrationTestThrow('list:map((x, y)->x, [1,2,3])');
integrationTestThrow('list:map((x)->x - 2, [true, false, true])');

// list:reduce
integrationTest('list:reduce((a,b)->a+b,[1,2,3])', '6');
integrationTest('list:reduce((a,b)->a+b,[1,2,3], 2)', '8');
integrationTest('list:reduce((a,b)->a+b,[1], 2)', '3');
integrationTestThrow('list:reduce((a,b)->a+b,[])');
integrationTestThrow('list:reduce((a,b)->a+b,[1])');
integrationTestThrow('list:reduce((a)->a,[1])');

// list:reverse
integrationTest('list:reverse([1,2,3])', '[3, 2, 1]');

// list:concat
integrationTest('list:concat([1,2,3], [1,2,3])', '[1, 2, 3, 1, 2, 3]');

// list:sort
integrationTest('list:sort([3, 2, 8, 5, 3])', '[2, 3, 3, 5, 8]');
integrationTestThrow('list:sort([1, true, 2])');

// list:range
integrationTest('list:range(1, 4)', '[1, 2, 3, 4]');
integrationTest('list:range(4, 1)', '[1, 2, 3, 4]');
integrationTest('list:range(4, 1, 2)', '[1, 3]');
integrationTest('list:range(4, 1, 4)', '[1]');
integrationTest('list:range(1, -1)', '[-1, 0, 1]');
integrationTestThrow('list:range(1, 10, 0)');
