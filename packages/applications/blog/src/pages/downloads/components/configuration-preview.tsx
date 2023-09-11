import { Platform } from "../../../components/platform";
import { Version } from "../../../components/version";
import { ConfigurationDto } from "../../../store/api.types";

export interface ReleasePreviewProps {
  configuration: ConfigurationDto;
}

export function ConfigurationPreview({ configuration }: ReleasePreviewProps) {
  return (
    <li className="w-full p-2 bg-neutral-800 rounded-sm">
      <h2 className="text-3xl font-extralight mb-4 text-center">
        {configuration.name}
      </h2>
      <section>
        <h3 className="mb-2 text-center">
          {configuration.name} Revision {configuration.latestBuildJob.revision}{" "}
          <Version {...configuration.latestBuildJob.version} />
        </h3>
        <div className="border p-4 rounded-sm border-white/10">
          <p className="mb-2 uppercase text-center tracking-widest">
            Downloads
          </p>
          <ul className="grid grid-cols-3 gap-2">
            {configuration.latestBuildJob.platforms.map((platform) => (
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
      </section>
    </li>
  );
}
