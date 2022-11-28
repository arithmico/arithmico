import createPlugin from '../../../utils/plugin-builder';
import physicalConstantsFragment from './fragments/physical-constants';

const physicsPlugin = createPlugin('core/physics', 'core', 'Contains physical constants.')
    .addFragment(physicalConstantsFragment)
    .build();

export default physicsPlugin;
