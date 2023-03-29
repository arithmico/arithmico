import { CandidateIntervall, Point } from './nsolve-types';

export default function findCandidates(points: Point[]): CandidateIntervall[] {
    const candidates: CandidateIntervall[] = [];

    if (points.length < 3) {
        return candidates;
    }

    for (let i = 1; i < points.length - 1; i++) {
        const y1 = points[i - 1][1],
            y2 = points[i][1],
            y3 = points[i + 1][1];

        if (y2 < y1 && y2 < y3) {
            const x1 = points[i - 1][0],
                x2 = points[i + 1][0];
            candidates.push([x1, x2]);
        }
    }

    return candidates;
}
