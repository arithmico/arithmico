import { useParams } from "react-router-dom";
import { useGetChangelogQuery } from "../../store/api";
import ChangelogMarkdown from "../../components/changelog-markdown";

interface SideMenuButtonProps {
  children: React.ReactNode;
}

function SideMenuButton({ children }: SideMenuButtonProps) {
  return (
    <button className="px-6 py-2 text-white/50 hover:text-white border border-white/50 hover:border-white">
      {children}
    </button>
  );
}

export default function Release() {
  const { releaseId } = useParams();
  const { data } = useGetChangelogQuery({ id: releaseId as string });

  return (
    <section className="mb-8">
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
          <SideMenuButton>Offline Version</SideMenuButton>
          <SideMenuButton>Source Code</SideMenuButton>
          <SideMenuButton>Github</SideMenuButton>
        </div>
        <div className="rounded-md bg-neutral-800 p-4">
          <h2 className="text-2xl font-semibold">Changelog</h2>
          <ChangelogMarkdown content={data?.content ?? ""} />
        </div>
      </div>
    </section>
  );
}
