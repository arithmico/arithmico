import createNumberNode from '../../../../create/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../../types';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];

const roundFragment = new PluginFragment()
    .addFunction(
        'round',
        singleNumberHeader,
        'Returns the value of a number rounded to the nearest integer',
        'Gibt die nächstgelegene ganze Zahl zurück',
        ({ getParameter }) => {
            const value = (<NumberNode>getParameter('x')).value;
            return createNumberNode(Math.round(value));
        },
    )
    .addFunction(
        'floor',
        singleNumberHeader,
        'Returns the largest integer less than or equal to a given number',
        'Gibt die größte ganze Zahl zurück, welche <= x ist',
        ({ getParameter }) => {
            const value = (<NumberNode>getParameter('x')).value;
            return createNumberNode(Math.floor(value));
        },
    )
    .addFunction(
        'ceil',
        singleNumberHeader,
        'Returns the smallest integer greater than or equal to a given number',
        'Gibt die kleinste ganze Zahl zurück, welche >= x ist',
        ({ getParameter }) => {
            const value = (<NumberNode>getParameter('x')).value;
            return createNumberNode(Math.ceil(value));
        },
    );

export default roundFragment;
