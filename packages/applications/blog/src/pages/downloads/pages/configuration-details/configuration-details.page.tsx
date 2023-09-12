import { useParams } from "react-router-dom";
import { Platform } from "../../../../components/platform";
import { Version } from "../../../../components/version";
import { useGetConfigurationDetailsQuery } from "../../../../store/api";

export function ConfigurationDetailsPage() {
  const { configurationId } = useParams();
  const { data, isSuccess } = useGetConfigurationDetailsQuery({
    configurationId: configurationId!,
  });

  if (!isSuccess) {
    return <></>;
  }

  return (
    <>
      <h1 className="text-6xl font-semibold mb-8 text-center">{data.name}</h1>

      <ul className="flex flex-col max-w-5xl w-screen gap-4 items-center">
        {data.buildJobs.map((buildJob) => (
          <li
            key={buildJob.buildJobId}
            className="w-1/3 p-2 bg-neutral-800 rounded-sm"
          >
            <h2 className="text-center text-xl mb-2">
              Revision {buildJob.revision} <Version {...buildJob.version} />
            </h2>
            <div className="border p-4 rounded-sm border-white/10">
              <p className="mb-2 uppercase text-center tracking-widest">
                Downloads
              </p>
              <ul className="grid grid-cols-3 gap-2">
                {buildJob.platforms.map((platform) => (
                  <li>
                    <a
                      className="flex items-center justify-center bg-white/5 hover:bg-white/10 p-2 rounded-sm"
                      href={`https://cdn.arithmico.com/${platform.artifactUrl}`}
                    >
                      <Platform platform={platform.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
