import { FunctionHeaderItem, NumberNode } from '../../../../types/SyntaxTreeNodes';
import createNumberNode from '../../../../node-operations/create-node/create-number-node';
import { calculateErf } from '../utils/erf';
import { PluginFragment } from '../../../../utils/plugin-builder';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];

const miscellaneousStatisticsFragment = new PluginFragment().addFunction(
    'erf',
    singleNumberHeader,
    'Gaussian error function',
    'Gaußsche Fehlerfunktion',
    ({ getParameter }) => {
        const x = (<NumberNode>getParameter('x')).value;
        return createNumberNode(calculateErf(x));
    },
);

export default miscellaneousStatisticsFragment;
