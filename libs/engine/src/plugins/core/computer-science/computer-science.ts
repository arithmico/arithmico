import createPlugin from '../../../utils/plugin-builder';
import ifThenElseFragment from './fragments/if-then-else';
import listModFragment from './fragments/listmod';

const computerSciencePlugin = createPlugin(
    'core/computer-science',
    'core',
    'Contains typical logical functions from computer science.',
)
    .addFragment(ifThenElseFragment)
    .addFragment(listModFragment)
    .build();

export default computerSciencePlugin;
