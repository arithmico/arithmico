import ArticlesPreview from "../../components/articles-preview";
import ReleasesPreview from "../../components/releases-preview";

interface FigureProps {
  src: string;
  alt: string;
  imgClassName: string;
  figureClassName?: string;
}

function Figure({
  src,
  alt,
  imgClassName,
  figureClassName = "max-w-xl",
}: FigureProps) {
  return (
    <figure className={figureClassName}>
      <img
        className={`rounded-2xl ${imgClassName} border-white/30 border-2 shadow-lg shadow-black`}
        src={src}
        alt={alt}
      ></img>
    </figure>
  );
}

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

        <div className="grid grid-cols-[1fr_1.1fr_1fr] gap-16 justify-center items-center mt-24 -mx-64">
          <Figure
            src="/imgs/screenshot-01.png"
            alt="screenshot light"
            imgClassName="-rotate-3"
          />
          <Figure
            src="/imgs/screenshot-01.png"
            alt="screenshot light"
            imgClassName="rotate-3"
          />
          <Figure
            src="/imgs/screenshot-01.png"
            alt="screenshot light"
            imgClassName="-rotate-2"
          />
        </div>

        <ArticlesPreview />
        <ReleasesPreview />
      </div>
    </>
  );
}
