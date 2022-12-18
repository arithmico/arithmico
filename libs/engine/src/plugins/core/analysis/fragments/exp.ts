import createNumberNode from '../../../../create-node/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../../types';
import { PluginFragment } from '../../../../utils/plugin-builder';

const expHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];

const expFragment = new PluginFragment()
    .addConstant('e', "Euler's number", 'Eulersche Zahl', createNumberNode(Math.E))
    .addFunction('exp', expHeader, 'Equivalent to e^x.', 'Äquivalent zu e^x', ({ getParameter }) => {
        const x = (<NumberNode>getParameter('x')).value;
        return createNumberNode(Math.exp(x));
    });

export default expFragment;
