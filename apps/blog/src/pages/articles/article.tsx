import { useParams } from "react-router-dom";
import ArticleContent from "../../components/article-content";
import { Article, useGetArticleQuery } from "../../store/api";

export default function ArticlePage() {
  const { articleId } = useParams();
  const { data: article } = useGetArticleQuery({ id: articleId as string });
  return <>{article && <ArticleContent {...(article as Article)} />}</>;
}
