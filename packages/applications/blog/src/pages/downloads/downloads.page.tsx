import { useState } from "react";
import { useGetConfigurationsQuery } from "../../store/api";
import { ConfigurationPreview } from "./components/configuration-preview";

export function DownloadsPage() {
  const limit = 3;
  const [skip] = useState(0);
  const { data, isSuccess } = useGetConfigurationsQuery({ skip, limit });

  if (!isSuccess) {
    return <></>;
  }

  const items = [...data?.items, ...data?.items, ...data?.items];

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-6xl font-semibold mb-8">Versionen</h1>
      <p className="mb-8">
        Hier bieten wir verschiedene Varianten der Offlineversion von Arithmico
        an, jede mit unterschiedlichem Funktionsumfang. Wählen Sie die Variante
        aus, die am besten zu Ihren Anforderungen passt. Unser Ziel ist es,
        Ihnen die passende Lösung für Ihre individuellen Bedürfnisse zu bieten.
      </p>
      <ul className="grid grid-cols-3 gap-4">
        {items.map((configuration) => (
          <ConfigurationPreview
            key={configuration.id}
            configuration={configuration}
          />
        ))}
      </ul>
    </div>
  );
}
