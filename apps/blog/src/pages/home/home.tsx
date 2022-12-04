export default function Home() {
  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] ">
        <div>
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
            von Anfang an mit dem Ziel der vollkommenden Barrierefreiheit
            entwickelt wurde.
          </p>
        </div>

        <div className="flex flex-col gap-8 mt-8">
          <img
            className="rounded-2xl rotate-6 border-2 border-white p-1"
            src="/imgs/screenshot-02.png"
            alt="screenshot light"
          ></img>
          <img
            className="rounded-2xl rotate-6 border-2 border-white p-1"
            src="/imgs/screenshot-01.png"
            alt="screenshot dark"
          ></img>
        </div>
      </div>
    </>
  );
}
