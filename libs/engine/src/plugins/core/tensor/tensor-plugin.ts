import createNumberNode from '../../../create/create-number-node';
import createVector from '../../../create/create-vector';
import { FunctionHeaderItem, Vector } from '../../../types';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { getTensorDimensions, getTensorRank } from '../../../utils/tensor-utils';

const tensorPlugin = createPlugin('tensor');
addPluginAuthor(tensorPlugin, 'core');
addPluginDescription(tensorPlugin, 'tensor utility functions');

const singleTensorHeader: FunctionHeaderItem[] = [{ name: 't', type: 'vector', evaluate: true }];

addPluginFunction(
    tensorPlugin,
    createPluginFunction(
        'tensor:rank',
        singleTensorHeader,
        'Computes the rank of the tensor',
        'Gibt den Rang des Tensors an',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'tensor:rank',
                parameters,
                singleTensorHeader,
                context,
            );
            const tensor = <Vector>parameterStackFrame['t'];
            try {
                return createNumberNode(getTensorRank(tensor));
            } catch (e) {
                throw 'RuntimeError: tensor:rank: invalid tensor shape';
            }
        },
    ),
);

addPluginFunction(
    tensorPlugin,
    createPluginFunction(
        'tensor:dims',
        singleTensorHeader,
        'Computes the dimensions of the tensor',
        'Gibt die Dimensionen des Tensors an',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'tensor:dims',
                parameters,
                singleTensorHeader,
                context,
            );
            const tensor = <Vector>parameterStackFrame['t'];
            try {
                return createVector(getTensorDimensions(tensor).map((n) => createNumberNode(n)));
            } catch (e) {
                throw 'RuntimeError: tensor:dims: invalid tensor shape';
            }
        },
    ),
);

export default tensorPlugin;
