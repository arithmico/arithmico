function ReleasePreview() {
  return (
    <li className="flex flex-col flex-1 p-4 rounded-md bg-zinc-800/90">
      <div className="flex items-baseline mb-4">
        <h3 className="text-xl">Arithmico v1.3.2</h3>
        <span className="ml-auto text-white/40 text-sm">10.12.2022</span>
      </div>

      <button className="border border-white/40 text-white/40 hover:border-white hover:text-white p-2">
        Download
      </button>
    </li>
  );
}

export default function ReleasesPreview() {
  return (
    <section className="mt-16 mb-16">
      <h2 className="text-3xl mb-4">Releases</h2>
      <ul className="flex gap-4">
        <ReleasePreview />
        <ReleasePreview />
        <ReleasePreview />
      </ul>
    </section>
  );
}
