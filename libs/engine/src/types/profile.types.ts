import { Options } from './context.types';

export interface Profile {
    loadingMode: 'whitelist' | 'blacklist';
    loadingList: string[];
    options: Options;
}

declare global {
    const __PROFILE: Profile;
    const __OPERATORS: {
        [key: string]: boolean;
    };
    const __OBJECTS: {
        [key: string]: boolean;
    };
}
