export interface VersionProps {
  major: number;
  minor: number;
  patch: number;
}

export function Version({ major, minor, patch }: VersionProps) {
  return (
    <span>
      v{major}.{minor}.{patch}
    </span>
  );
}
