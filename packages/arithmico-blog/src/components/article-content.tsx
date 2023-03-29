import { Article, useGetAuthorsQuery } from "../store/api";
import Markdown from "./markdown";

export default function ArticleContent({
  createdAt,
  authorIds,
  content,
  title,
}: Article) {
  const { data: authors } = useGetAuthorsQuery({ ids: authorIds });

  return (
    <article className="mb-8 mx-20 border-b border-b-white/5">
      <div className="flex flex-col">
        <h1 className="text-3xl mb-1">{title}</h1>
        <span className="text-white/40 mb-4 flex">
          von{" "}
          {authors?.map((author) => `${author.firstname} ${author.lastname}`)}
          <span className="text-white/40 ml-auto">
            {new Date(createdAt).toLocaleDateString("de-DE")}
          </span>
        </span>
      </div>
      <div className="">
        <Markdown content={content} />
      </div>
    </article>
  );
}
