import createPluginV2 from '../../../utils/plugin-builder-v2';
import ifThenElseFragment from './fragments/if-then-else';
import listModFragment from './fragments/listmod';

const computerSciencePlugin = createPluginV2(
    'core/computer-science',
    'core',
    'Contains typical logical functions from computer science.',
)
    .addFragment(ifThenElseFragment)
    .addFragment(listModFragment)
    .build();

export default computerSciencePlugin;
