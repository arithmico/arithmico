//import { FunctionHeaderItem } from './../../types/SyntaxTreeNodes';
import { addPluginAuthor, addPluginDescription, createPlugin } from '../../utils/plugin-builder';

const nsolvePlugin = createPlugin('core/nsolve');

addPluginAuthor(nsolvePlugin, 'core');
addPluginDescription(nsolvePlugin, 'adds nsolve function');

//const nsolveHeader: FunctionHeaderItem[] = [{ type: 'equals', name: 'equation' }, { type: 'number' }];
