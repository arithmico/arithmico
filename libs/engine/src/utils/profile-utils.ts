import { Profile } from '../types';
import { createOptions } from './context-utils';

const defaultProfile: Profile = {
    loadingMode: 'blacklist',
    loadingList: [],
    options: createOptions(),
};

export function createProfile(profile?: Partial<Profile>): Profile {
    return {
        ...defaultProfile,
        ...profile,
    };
}
