import { Options } from './context.types';

export interface Profile {
    loadingMode: 'whitelist' | 'blacklist';
    loadingList: string[];
    options: Options;
}
