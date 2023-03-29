import { Changelog } from "../store/api";
import ChangelogMarkdown from "./changelog-markdown";

interface SideMenuButtonProps {
  children: React.ReactNode;
  href?: string;
}

function SideMenuButton({ children, href }: SideMenuButtonProps) {
  return (
    <a
      href={href}
      className="text-center px-6 py-2 text-white/50 hover:text-white border border-white/50 hover:border-white"
    >
      {children}
    </a>
  );
}

interface ReleaseDetailsProps {
  data: Changelog;
}

export function ReleaseDetails({ data }: ReleaseDetailsProps) {
  return (
    <section className="mb-16">
      <div className="flex items-baseline border-b border-white/5 mb-4">
        <h1 className="text-4xl font-extralight">
          Arithmico <span className="font-semibold">{data?.version}</span>
        </h1>
        <span className="ml-auto text-white/40">
          {new Date(data?.releaseDate ?? "").toLocaleDateString("de-DE")}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_3fr] gap-16 ">
        <div className="flex flex-col gap-4">
          <SideMenuButton href={data.downloadUrl}>
            Offline Version
          </SideMenuButton>
          <SideMenuButton>Source Code</SideMenuButton>
          <SideMenuButton>Github</SideMenuButton>
        </div>
        {data?.content && (
          <div className="rounded-md bg-neutral-850 p-4">
            <h2 className="text-2xl font-semibold">Changelog</h2>
            <ChangelogMarkdown content={data?.content ?? ""} />
          </div>
        )}
      </div>
    </section>
  );
}
