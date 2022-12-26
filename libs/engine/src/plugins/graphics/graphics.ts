import createPlugin from '../../utils/plugin-builder';

const graphicsPlugin = createPlugin({ de: 'Grafik', en: 'Graphics' }, 'core', {
    en: 'Contains various graphics functionalities',
}).build();

export default graphicsPlugin;
