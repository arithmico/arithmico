import { FunctionHeaderItem, NumberNode } from '../../../types/nodes.types';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { calculateErf } from '../utils/erf';
import { PluginFragment } from '../../../utils/plugin-builder';
import { calculateQuantileOfStandardNormalCDF } from '../utils/quantile-standard-normal';

const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'x', type: 'number', evaluate: true }];

const miscellaneousStatisticsFragment = new PluginFragment();

__FUNCTIONS.erf &&
    miscellaneousStatisticsFragment.addFunction(
        'erf',
        singleNumberHeader,
        'Gaussian error function',
        'Gaußsche Fehlerfunktion',
        ({ getParameter }) => {
            const x = (<NumberNode>getParameter('x')).value;
            return createNumberNode(calculateErf(x));
        },
    );

__FUNCTIONS.erfinv &&
    miscellaneousStatisticsFragment.addFunction(
        'erfinv',
        singleNumberHeader,
        'inverse Gaussian error function',
        'Inverse Gaußsche Fehlerfunktion',
        ({ getParameter, runtimeError }) => {
            const x = (<NumberNode>getParameter('x')).value;

            if (x < -1 || x > 1) {
                throw runtimeError('x is not between -1 and 1');
            }

            return createNumberNode(calculateQuantileOfStandardNormalCDF((x + 1) / 2) / Math.SQRT2);
        },
    );

export default miscellaneousStatisticsFragment;
