import createPluginV2 from '../../../utils/plugin-builder-v2';
import physicalConstantsFragment from './fragments/physical-constants';

const physicsPlugin = createPluginV2('core/physics', 'core', 'Contains physical constants.')
    .addFragment(physicalConstantsFragment)
    .build();

export default physicsPlugin;
