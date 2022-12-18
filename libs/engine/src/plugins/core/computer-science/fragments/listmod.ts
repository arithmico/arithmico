import createFunctionCall from '../../../../create-node/create-function-call';
import createNumberNode from '../../../../create-node/create-number-node';
import createVector from '../../../../create-node/create-vector';
import evaluate from '../../../../eval';
import { FunctionHeaderItem, FunctionNode, NumberNode, SyntaxTreeNode, Vector } from '../../../../types';
import { PluginFragment } from '../../../../utils/plugin-builder';

const singleListHeader: FunctionHeaderItem[] = [{ name: 'l', type: 'vector', evaluate: true }];
const twoListsHeader: FunctionHeaderItem[] = [
    { name: 'l1', type: 'vector', evaluate: true },
    { name: 'l2', type: 'vector', evaluate: true },
];
const functionAndListHeader: FunctionHeaderItem[] = [
    { name: 'f', type: 'function', evaluate: true },
    { name: 'l', type: 'vector', evaluate: true },
];
const reduceHeader: FunctionHeaderItem[] = [
    { name: 'f', type: 'function', evaluate: true },
    { name: 'l', type: 'vector', evaluate: true },
    { name: 'start_acc', type: 'any', evaluate: true, optional: true },
];
const rangeHeader: FunctionHeaderItem[] = [
    { name: 'start', type: 'number', evaluate: true },
    { name: 'stop', type: 'number', evaluate: true },
    { name: 'step_size', type: 'number', evaluate: true, optional: true },
];

const listModFragment = new PluginFragment()
    .addFunction(
        'list:filter',
        functionAndListHeader,
        'Filter a list l with a filter function f',
        'Filter eine Liste l mit einer Filterfunktion f',
        ({ getParameter, typeError, context }) => {
            const filterFunction = <FunctionNode>getParameter('f');
            const list = <Vector>getParameter('l');
            const resultValues: SyntaxTreeNode[] = [];

            if (filterFunction.header.length !== 1) {
                throw typeError('Invalid filter function signature');
            }

            list.values.forEach((value) => {
                const filterResult = evaluate(createFunctionCall(filterFunction, [value]), context);
                if (filterResult.type !== 'boolean') {
                    throw typeError(
                        `Invalid filter function return type. Expected "boolean" got "${filterResult.type}"`,
                    );
                }

                if (filterResult.value) {
                    resultValues.push(value);
                }
            });

            return createVector(resultValues);
        },
    )
    .addFunction(
        'list:map',
        functionAndListHeader,
        'Maps each element x of list l to f(x).',
        'Bildet jedes Element x der List l auf f(x) ab.',
        ({ getParameter, typeError, context }) => {
            const mapFunction = <FunctionNode>getParameter('f');
            const list = <Vector>getParameter('l');
            const resultValues: SyntaxTreeNode[] = [];

            if (mapFunction.header.length !== 1) {
                throw typeError('Invalid map function signature');
            }

            list.values.forEach((value) => {
                const mapResult = evaluate(createFunctionCall(mapFunction, [value]), context);
                resultValues.push(mapResult);
            });

            return createVector(resultValues);
        },
    )
    .addFunction(
        'list:reduce',
        reduceHeader,
        'Reduces a list to a single value with the specified reducer function',
        'Reduziert eine Liste mithilfe der übergebenen Reduzierfunktion',
        ({ getParameter, getNullableParameter, runtimeError, typeError, context }) => {
            const reduceFunction = <FunctionNode>getParameter('f');
            const list = <Vector>getParameter('l');
            const startAcc = <SyntaxTreeNode>getNullableParameter('start_acc');

            if (reduceFunction.header.length !== 2) {
                throw typeError('Invalid reduce function signature');
            }

            if (list.values.length === 0) {
                throw runtimeError('List is empty');
            }

            if (list.values.length < 2 && !startAcc) {
                throw runtimeError('start_acc not specified');
            }

            if (startAcc) {
                return list.values.reduce(
                    (acc, value) => evaluate(createFunctionCall(reduceFunction, [acc, value]), context),
                    startAcc,
                );
            }

            return list.values.reduce((acc, value) =>
                evaluate(createFunctionCall(reduceFunction, [acc, value]), context),
            );
        },
    )
    .addFunction(
        'list:reverse',
        singleListHeader,
        'Creates a new list with the elements of l in reverse order.',
        'Erzeugt eine neue Liste mit den Elementen von l in umgekehrter Reihenfolge.',
        ({ getParameter }) => {
            const values = (<Vector>getParameter('l')).values;
            return createVector([...values].reverse());
        },
    )
    .addFunction(
        'list:sort',
        singleListHeader,
        'Creates a new sorted list with the elements of l.',
        'Erzeugt eine neue sortierte Liste mit den Elementen von l.',
        ({ getParameter, typeError }) => {
            const values = (<Vector>getParameter('l')).values.map((value) => {
                if (value.type !== 'number') {
                    throw typeError(`Expected list of numbers but found element of type ${value.type}`);
                }

                return value.value;
            });
            return createVector([...values].sort().map((value) => createNumberNode(value)));
        },
    )
    .addFunction(
        'list:concat',
        twoListsHeader,
        'Creates a new list with the elements of l1 and l2 concatenated.',
        'Erzeugt eine neue Liste mit den Elementen von l1 und l2 hintereinander gehängt.',
        ({ getParameter }) => {
            const firstListValues = (<Vector>getParameter('l1')).values;
            const secondListValues = (<Vector>getParameter('l2')).values;
            return createVector([...firstListValues, ...secondListValues]);
        },
    )
    .addFunction(
        'list:range',
        rangeHeader,
        'Generates a list with numbers from "start" to "stop" in ascending order with a spacing of "step_size".',
        'Erzeugt eine Liste mit aufsteigend sortierten Zahlen von "start" bis "stop" im Abstand von "step_size".',
        ({ getParameter, runtimeError }) => {
            const start = (<NumberNode>getParameter('start')).value;
            const stop = (<NumberNode>getParameter('stop')).value;
            const stepSize = (<NumberNode>getParameter('step_size', createNumberNode(1))).value;
            const values: number[] = [];
            const min = Math.min(start, stop);
            const max = Math.max(start, stop);
            const increment = Math.abs(stepSize);

            if (increment <= 0) {
                throw runtimeError('step_size must be >= 0');
            }

            for (let i = min; i <= max; i += increment) {
                values.push(i);
            }

            return createVector(values.map((value) => createNumberNode(value)));
        },
    );

export default listModFragment;
