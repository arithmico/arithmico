import { Point } from './nsolve-types';

export default function findDirectHits(points: Point[]): number[] {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return points.filter(([_x, y]) => y === 0).map(([x, _y]) => x);
}