import { Point } from './nsolve-types';

export default function findDirectHits(points: Point[]): number[] {
    return points.filter(([, y]) => y === 0).map(([x]) => x);
}
