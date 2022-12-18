import { Lambda } from '../../types';

export default function createLambda(header: Lambda['header'], value: Lambda['expression']): Lambda {
    return {
        type: 'lambda',
        header,
        expression: value,
    };
}
