export interface PlatformProps {
  platform: string;
}

export function Platform({ platform }: PlatformProps) {
  if (platform === "windows") return <>Windows</>;
  if (platform === "linux") return <>Linux</>;
  if (platform === "macos") return <>MacOS</>;
  return <>Unbekannt</>;
}
