import createNumberNode from '../../../../node-operations/create-node/create-number-node';
import createVector from '../../../../node-operations/create-node/create-vector';
import { FunctionHeaderItem, Vector } from '../../../../types';
import { getTensorDimensions, getTensorRank } from '../../../../utils/tensor-utils';
import { PluginFragment } from '../../../../utils/plugin-builder';

const singleTensorHeader: FunctionHeaderItem[] = [{ name: 't', type: 'vector', evaluate: true }];

const tensorFragment = new PluginFragment()
    .addFunction(
        'tensor:rank',
        singleTensorHeader,
        'Computes the rank of the tensor',
        'Gibt den Rang des Tensors an',
        ({ getParameter, runtimeError }) => {
            const tensor = <Vector>getParameter('t');
            try {
                return createNumberNode(getTensorRank(tensor));
            } catch (e) {
                throw runtimeError('invalid tensor shape');
            }
        },
    )
    .addFunction(
        'tensor:dims',
        singleTensorHeader,
        'Computes the dimensions of the tensor',
        'Gibt die Dimensionen des Tensors an',
        ({ getParameter, runtimeError }) => {
            const tensor = <Vector>getParameter('t');
            try {
                return createVector(getTensorDimensions(tensor).map((n) => createNumberNode(n)));
            } catch (e) {
                throw runtimeError('invalid tensor shape');
            }
        },
    );

export default tensorFragment;
