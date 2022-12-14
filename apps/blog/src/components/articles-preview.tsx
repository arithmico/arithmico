import { Link } from "react-router-dom";

function ArticlePreview() {
  return (
    <li className="bg-neutral-800 rounded-md p-4 h-72 grid grid-rows-[1fr_0_auto]">
      <div className="overflow-clip">
        <h3 className="text-3xl mb-4">Arithmico gewinnt HEPS</h3>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div>
      <div className="-translate-y-[100%] w-full h-16 bg-gradient-to-b from-transparent to-neutral-800"></div>
      <Link className="text-white/50 mt-4 text-sm" to="/articles/foo">
        {">"} Weiterlesen
      </Link>
    </li>
  );
}

export default function ArticlesPreview() {
  return (
    <section className="mt-32">
      <h3 className="font-extralight text-3xl mb-6 uppercase text-center tracking-widest">
        Artikel
      </h3>
      <ul className="grid grid-cols-2 gap-y-4 gap-x-6 px-20">
        <ArticlePreview />
        <ArticlePreview />
        <ArticlePreview />
        <ArticlePreview />
      </ul>
      <div className="flex mt-4 justify-center">
        <Link to="/articles" className="text-white/40">
          mehr
        </Link>
      </div>
    </section>
  );
}
