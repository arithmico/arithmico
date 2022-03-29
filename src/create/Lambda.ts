import { Lambda } from '../types';

export default function createLambda(header: Lambda['header'], value: Lambda['value']): Lambda {
    return {
        type: 'lambda',
        header,
        value,
    };
}
