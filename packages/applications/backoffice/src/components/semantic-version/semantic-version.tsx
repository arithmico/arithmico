export interface SemanticVersionProps {
  version?: {
    major: number;
    minor: number;
    patch: number;
  };
  className?: string;
}

export function SemanticVersion({ version, className }: SemanticVersionProps) {
  return (
    <span className={className}>
      {version ? `v${version.major}.${version.minor}.${version.patch}` : "-"}
    </span>
  );
}
