import ArticlesPreview from "../../components/articles-preview";
import ReleasesPreview from "../../components/releases-preview";

export default function Home() {
  return (
    <>
      <div className="">
        <div className="w-full max-w-2xl">
          <img
            className="absolute w-14 h-14 border-2 border-white p-0.5 rounded-full -ml-8 mb-8 -translate-x-full"
            src="/logo512.png"
            alt="logo"
          ></img>
          <h1 className="text-white text-6xl font-semibold flex flex-col mb-8">
            <span className="mb-4">Arithmico</span>
            <span className="font-extralight text-4xl">
              Einfach. Barrierefrei. Open Source.
            </span>
          </h1>
          <p className="text-white font-light text-lg">
            Arithmico ist eine freie und umfangreiche Mathematiksoftware, die
            von Anfang an mit dem Ziel der Barrierefreiheit entwickelt wurde.
          </p>
        </div>

        <div className="flex gap-16 left-0 justify-center mt-24 -mx-64  ">
          <figure className="max-w-xl">
            <img
              className="rounded-2xl -rotate-3 border-zinc-600 border-2"
              src="/imgs/screenshot-01.png"
              alt="screenshot light"
            ></img>
          </figure>
          <figure className="max-w-xl">
            <img
              className="rounded-2xl rotate-3 border-zinc-600 border-2"
              src="/imgs/screenshot-01.png"
              alt="screenshot light"
            ></img>
          </figure>
          <figure className="max-w-xl">
            <img
              className="rounded-2xl -rotate-2 border-zinc-600 border-2"
              src="/imgs/screenshot-01.png"
              alt="screenshot dark"
            ></img>
          </figure>
        </div>

        <ArticlesPreview />
        <ReleasesPreview />
      </div>
    </>
  );
}
