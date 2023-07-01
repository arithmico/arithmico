import { SemanticVersion } from '../../infrastructure/database/schemas/sematic-version/semantic-version.schema';

export function semanticVersionGreaterThan(
  a: SemanticVersion,
  b: SemanticVersion,
): boolean {
  return (
    a.major > b.major ||
    (a.major >= b.major && a.minor > b.minor) ||
    (a.major >= b.major && a.minor >= b.minor && a.patch > b.patch)
  );
}

export function semanticVersionGreaterThanOrEqual(
  a: SemanticVersion,
  b: SemanticVersion,
): boolean {
  return !semanticVersionGreaterThan(b, a);
}
