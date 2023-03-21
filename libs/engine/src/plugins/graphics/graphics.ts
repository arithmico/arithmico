import createPlugin from '../../utils/plugin-builder';
import functionPlotFragment from './fragments/function-plot';

const graphicsPlugin = createPlugin({ de: 'Grafik', en: 'Graphics' }, 'core', {
    en: 'Contains various graphics functionalities',
})
    .addFragment(functionPlotFragment)
    .build();

export default graphicsPlugin;
