import classNames from "classnames";
import PageContainer from "../../components/page-container/page-container";
import WithScrollbars from "../../components/with-scrollbars/with-scrollbars";

export default function Home() {
  return (
    <WithScrollbars>
      <PageContainer className={classNames("flex", "flex-col")}>
        config
      </PageContainer>
    </WithScrollbars>
  );
}
