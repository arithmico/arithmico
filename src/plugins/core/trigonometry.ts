import createNumberNode from '../../create/NumberNode';
import { addPluginAuthor, addPluginConstant, addPluginDescription, createPlugin } from '../../utils/plugin-builder';

const trigonometryPlugin = createPlugin('core/trigonometry');

addPluginAuthor(trigonometryPlugin, 'core');
addPluginDescription(trigonometryPlugin, 'adds trigonometry functions and constants');

addPluginConstant(trigonometryPlugin, {
    name: 'pi',
    value: createNumberNode(Math.PI),
    documentation: {
        en: {
            synopsis: 'pi',
            description: "π is commonly defined as the ratio of a circle's circumference C to its diameter d",
        },
        de: {
            synopsis: 'pi',
            description: 'Kreiszahl π',
        },
    },
});

export default trigonometryPlugin;
