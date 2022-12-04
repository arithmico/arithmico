import { GlobalDocumentationItem, Plugin, Profile } from '../types';

export default function loadDocumentationFromPlugin(plugin: Plugin, profile: Profile) {
    const constants: GlobalDocumentationItem[] = plugin.constants
        .filter(
            (constant) =>
                (profile.loadingMode === 'whitelist' && profile.loadingList.includes(constant.name)) ||
                (profile.loadingMode === 'blacklist' && !profile.loadingList.includes(constant.name)),
        )
        .map((constant) => ({
            type: 'constant',
            plugin: plugin.name,
            documentation: constant.documentation,
        }));

    const functions: GlobalDocumentationItem[] = plugin.functions
        .filter(
            (func) =>
                (profile.loadingMode === 'whitelist' && profile.loadingList.includes(func.name)) ||
                (profile.loadingMode === 'blacklist' && !profile.loadingList.includes(func.name)),
        )
        .map((func) => ({
            type: 'function',
            plugin: plugin.name,
            documentation: func.documentation,
        }));

    const methods: GlobalDocumentationItem[] = plugin.methods
        .filter(
            (method) =>
                (profile.loadingMode === 'whitelist' && profile.loadingList.includes(method.name)) ||
                (profile.loadingMode === 'blacklist' && !profile.loadingList.includes(method.name)),
        )
        .map((method) => ({
            type: 'method',
            plugin: plugin.name,
            documentation: method.documentation,
        }));

    return [...constants, ...functions, ...methods];
}
