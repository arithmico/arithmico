import { Route, Routes } from "react-router-dom";
import ArticleContent from "../../components/article-content";
import { useGetArticlesQuery } from "../../store/api";
import ArticlePage from "./article";

function ArticleList() {
  const { data } = useGetArticlesQuery({ limit: 4 });

  return (
    <div>
      {data?.map((article, index) => (
        <ArticleContent key={index} {...article} />
      ))}
    </div>
  );
}

export default function Articles() {
  return (
    <>
      <Routes>
        <Route index element={<ArticleList />} />
        <Route path=":articleId" element={<ArticlePage />} />
      </Routes>
    </>
  );
}
