import { FormattedMessage } from "react-intl";
import Heading from "../../components/heading/heading";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";

export default function Home() {
  return (
    <PageWithNavbar>
      <Heading level={1} className="my-4">
        <FormattedMessage id="home.title" />
      </Heading>
      <p>
        <FormattedMessage id="home.description" />
      </p>
    </PageWithNavbar>
  );
}
