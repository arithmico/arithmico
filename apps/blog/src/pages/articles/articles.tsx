import ArticleContent from "../../components/article-content";
import { useGetArticlesQuery } from "../../store/api";

export default function Articles() {
  const { data } = useGetArticlesQuery({ limit: 4 });

  return (
    <div>
      {data?.map((article) => (
        <ArticleContent {...article} />
      ))}
    </div>
  );
}
