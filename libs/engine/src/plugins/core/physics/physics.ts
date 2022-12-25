import createPlugin from '../../../utils/plugin-builder';
import physicalConstantsFragment from './fragments/physical-constants';

const physicsPlugin = createPlugin({ en: 'Physics', de: 'Physik' }, 'core', { en: 'Contains physical constants.' })
    .addFragment(physicalConstantsFragment)
    .build();

export default physicsPlugin;
