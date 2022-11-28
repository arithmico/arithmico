import createPlugin from '../../../utils/plugin-builder';
import primeNumberFragment from './fragments/prime-numbers';
import gcdLcmFragment from './fragments/gcd-lcm';
import coprimeFragment from './fragments/coprime';
import moduloFragment from './fragments/modulo';
import miscellaneousDiscreteMathFragment from './fragments/miscellaneous';

const discreteMathPlugin = createPlugin(
    'core/discrete-math',
    'brings many functions for calculation on integers and in number theory',
    'core',
)
    .addFragment(primeNumberFragment)
    .addFragment(gcdLcmFragment)
    .addFragment(coprimeFragment)
    .addFragment(moduloFragment)
    .addFragment(miscellaneousDiscreteMathFragment)
    .build();

export default discreteMathPlugin;
