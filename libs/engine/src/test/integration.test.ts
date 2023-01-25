import { getDefaultContext } from '..';
import createNumberNode from '../node-operations/create-node/create-number-node';
import { createOptions } from '../utils/context-utils';
import { createTestContext, integrationTest, integrationTestThrow } from '../utils/integration-test-utils';

const defaultStack = getDefaultContext().stack;
const germanTextContext = createTestContext(defaultStack, createOptions({ decimalSeparator: ',' }));

integrationTest('1', '1');
integrationTest('[1,2,3]', '[1, 2, 3]');
integrationTest('1 + 2', '3');
integrationTest('1 - 2', '-1');
integrationTest('-2', '-2');
integrationTest('--2', '2');
integrationTest('2 * 3', '6');
integrationTest('4 / 2', '2');
integrationTest('2 ^ 3', '8');
integrationTest('true & false', 'false');
integrationTest('true & true', 'true');
integrationTest('true | false', 'true');
integrationTest('false | false', 'false');
integrationTest('-true', 'false');
integrationTest('2 < 3 < 4', 'true');
integrationTest('2 < 3 < 3', 'false');
integrationTest('1 < 2 <= 2 = 2 >= 2 > 1', 'true');
integrationTest('2 + 3 * 4 ^ 5 / 32 = 98', 'true');
integrationTest('10 / 2 / 5', '1');
integrationTest('10 - 5 - 3 - 2', '0');
integrationTest('-2 + 4', '2');
integrationTest('2 + -4', '-2');
integrationTest('2 * -2', '-4');
integrationTest('2 / -2', '-1');
integrationTest('-2^4', '-16');
integrationTest('2^-1', '0.5');
integrationTest('[[1, 2], 3] + [[3, 2], 1]', '[[4, 4], 4]');
integrationTest('[[3,2,1],[1,0,2]]*[[1,2],[0,1],[4,0]]', '[[7, 8], [9, 2]]');
integrationTest('[1,2,3]*[3,2,1]', '10');
integrationTest('[[1,0],[0,1]]*[4,5]', '[4, 5]');
integrationTest('[4,5]*[[1,0],[0,1]]', '[4, 5]');
integrationTest('[2,4,6]/2', '[1, 2, 3]');
integrationTest('a + 1', '42', createTestContext([new Map(Object.entries({ a: createNumberNode(41) }))]));
integrationTest('"foo"', '"foo"');
integrationTest("'foo'", '"foo"');
integrationTest('((x)->x^2)(2)', '4');
integrationTest('((x: number) -> x+1)(3)', '4');
integrationTest('((x: number) -> x) + ((y: number) -> y^2)', '(x: number) → x + x^2');
integrationTest('((x: number) -> x) + ((x: number) -> x^2)', '(x: number) → x + x^2');
integrationTest('foo:bar:=42', 'foo:bar := 42');
integrationTest('[1, 2, 3]^3', '[14, 28, 42]');
integrationTest('[1, 2, 3]^1', '[1, 2, 3]');
integrationTest('[[1, 2], [3, 4]]^3', '[[37, 54], [81, 118]]');
integrationTest('[[1, 2], [3, 4]]^1', '[[1, 2], [3, 4]]');
integrationTest('[[1, 2], [3, 4]]^0', '[[1, 0], [0, 1]]');
integrationTest('((x->x)+(y->2*y))(2)', '6');
integrationTest('(__proto__ -> __proto__)(2)', '2');
integrationTest('[1;2;3]', '[1; 2; 3]', germanTextContext);
integrationTest('1,2+1,3', '2,5', germanTextContext);
integrationTest('((x; y) -> x + y)(1;2)', '3', germanTextContext);
integrationTest('((x; y) -> x + y)', '(x: any; y: any) → x + y', germanTextContext);
integrationTest('f := (x) -> (y -> y^2)', 'f := (x: any) → (y: any) → y^2');
integrationTest('\\sqrt {4}', '2');
integrationTest('2 * \\sqrt {4}', '4');
integrationTest('\\sqrt [3] {8}', '2');
integrationTest('\\frac {4} {8}', '0.5');
integrationTest('\\frac {4} {\\sqrt { 4 } }', '2');
integrationTest('\\log_{4} (8)', '1.5');
integrationTest('\\log (10)', '1');
integrationTest('\\log(10)', '1');
integrationTest('\\log ( \\sqrt{100} ) ', '1');
integrationTest('\\ln(10)', '2.302585');
integrationTest('\\ln(\\sqrt{\\frac{300}{3}}) ', '2.302585');
integrationTest('\\pi', `3.141593`);
integrationTest('\\cos(90) ', '0');
integrationTest('\\sin(90) ', '1');
integrationTest('\\tan(45) ', '1');
integrationTest('\\arcsin(1)', '90');
integrationTest('\\arccos(0)', '90');
integrationTest('\\arctan(1)', '45');
integrationTest('\\cosh(5) ', '74.209949');
integrationTest('\\sinh(5) ', '74.203211');
integrationTest('\\tanh(5) ', '0.999909');
integrationTest('2^2', '4');
integrationTest('2^{2}', '4');
integrationTest('2^{2+2}', '16');
integrationTest('2^{2+2}+2', '18');
integrationTest('(2+1)^{2}', '9');
integrationTest('(2+1)^{2+2}', '81');

integrationTestThrow('1 + true');
integrationTestThrow('2 + [1,2,3]');
integrationTestThrow('2 ^ 3 ^ 4');
integrationTestThrow('4 * true');
integrationTestThrow('[[1,2],3]+[1,2,3]');
integrationTestThrow('[1,2]+[1,2,3]');
integrationTestThrow('(-1)^2.1');
integrationTestThrow('1,2+1,3');
integrationTestThrow('((x; y) -> x + y)(1;2)');
integrationTestThrow('[1, [2, 3]]^1');
integrationTestThrow('[1, 2]^(-1)');
integrationTestThrow('[1, 2]^1.5');
integrationTestThrow('[[[1]]]^2');
integrationTestThrow('[[1], [2]]^2');
integrationTestThrow('[1, 2, 3]^0');
integrationTestThrow('[1, [2, 3]]^1');
integrationTestThrow('[1, 2]^(-1)');
integrationTestThrow('[1, 2]^1.5');
integrationTestThrow('[[[1]]]^2');
integrationTestThrow('[[1], [2]]^2');
integrationTestThrow('[1, 2, 3]^0');
