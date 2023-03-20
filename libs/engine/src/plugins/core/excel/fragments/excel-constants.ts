import createNumberNode from '../../../../node-operations/create-node/create-number-node';
import { PluginFragment } from '../../../../utils/plugin-builder';
import { FunctionHeaderItem, NumberNode } from '../../../../types/nodes.types';
import createVector from '../../../../node-operations/create-node/create-vector';


const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

const excelConstantsFragment = new PluginFragment().addConstant(
    'excel:five',
    'Test output five',
    'Test output fünf',
    createNumberNode(5),
  )
    .addFunction(
      'wurzel',
      singleNumberHeader,
      'square root.',
      'Quadratwurzel',
      ({ getParameter, runtimeError }) => {
        const n = (<NumberNode>getParameter('n')).value;

        if (n < 0) {
          throw runtimeError('Numbers smaller than 0 are not allowed.');
        }

        return createNumberNode(Math.sqrt(n));
      },
    )

;
export default excelConstantsFragment;