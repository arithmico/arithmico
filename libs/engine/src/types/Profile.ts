import { Options } from './Context';

export interface Profile {
    loadingMode: 'whitelist' | 'blacklist';
    loadingList: string[];
    operators: Options['operators'];
}
