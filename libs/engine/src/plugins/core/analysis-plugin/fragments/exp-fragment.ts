import createNumberNode from '../../../../create/create-number-node';
import { FunctionHeaderItem, NumberNode } from '../../../../types';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';

const expHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];

const expFragment = new PluginFragment()
    .addFunction('exp', expHeader, 'Equivalent to e^x.', 'Äquivalent zu e^x', ({ getParameter }) => {
        const x = (<NumberNode>getParameter('x')).value;
        return createNumberNode(Math.exp(x));
    })
    .addConstant('e', "Euler's number", 'Eulers Zahl', createNumberNode(Math.E));

export default expFragment;
