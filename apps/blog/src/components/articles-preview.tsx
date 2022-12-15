import { Link } from "react-router-dom";
import ChevronRight from "../icons/chevron-right";
import { Article, useGetArticlesQuery } from "../store/api";
import Markdown from "./markdown";

function ArticlePreview({ title, content, createdAt, id }: Article) {
  return (
    <li className="bg-neutral-850 rounded-md p-4 h-72 max-h-72 grid grid-rows-[1fr_0_auto] odd:translate-y-8">
      <div className="overflow-hidden">
        <div className="flex items-baseline">
          <h3 className="text-3xl mb-4">{title}</h3>
          <span className="ml-auto text-white/40">
            {new Date(createdAt).toLocaleDateString("de-DE")}
          </span>
        </div>
        <div className="text-white/70">
          <Markdown content={content} />
        </div>
      </div>
      <div className="-translate-y-[100%] w-full h-16 bg-gradient-to-b from-transparent to-neutral-850"></div>
      <Link
        className="text-white/50 mt-4 text-sm flex items-center"
        to={`/articles/${id}`}
      >
        <ChevronRight className="fill-white/50 w-4 h-4" />
        Weiterlesen
      </Link>
    </li>
  );
}

export default function ArticlesPreview() {
  const { data: articles } = useGetArticlesQuery({ limit: 4 });
  return (
    <section className="mt-32">
      <h3 className="font-extralight text-3xl mb-6 uppercase text-center tracking-widest">
        Artikel
      </h3>
      <ul className="grid grid-cols-2 gap-y-4 gap-x-6 px-20">
        {articles?.map((article, index) => (
          <ArticlePreview key={index} {...article} />
        ))}
      </ul>
      <div className="flex mt-16 justify-center">
        <Link to="/articles" className="text-white/40">
          mehr
        </Link>
      </div>
    </section>
  );
}
