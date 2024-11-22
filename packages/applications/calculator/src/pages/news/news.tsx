import { Trans, useTranslation } from "react-i18next";
import PageContainer from "../../components/page-container/page-container";
import { Link } from "react-router-dom";

export function NewsPage() {
  const [t] = useTranslation();

  return <PageContainer className="flex flex-col">
    <h1 className="text-5xl mb-4">
      {t("news.title")}
    </h1>
    <p className="text-2xl my-4">
      <Trans i18nKey={"news.content"}>
        {{}}
        <a 
          className="font-bold underline"
          href="https://soscisurvey.ifss.kit.edu/math4vip/"
        >here</a>
      </Trans>
    </p>
    <div className="mt-8">
      <Link className="theme-light:border-black theme-dark:border-white border-2 px-4 py-2 text-2xl" to={"/"}>
        {t("news.back")}
      </Link>
    </div>
  </PageContainer>
}