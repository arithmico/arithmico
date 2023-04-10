import { Route, Routes } from "react-router-dom";
import Calculator from "@pages/calculator/calculator";
import Settings from "@pages/settings/settings";
import Manual from "@pages/manual/manual";
import About from "@pages/about/about";
import Protocol from "@pages/protocol/protocol";
import Definitions from "@pages/definitions/definitions";
import TermsOfService from "@pages/terms-of-service/terms-of-service";
import PrivacyPolicy from "@pages/privacy-policy/privacy-policy";
import Imprint from "../../pages/imprint/imprint";
import useNotifyNewVersion from "../../hooks/use-notify-new-version";
import NewVersionAvailable from "../../pages/new-version-available/new-version-available";

export default function AppRoutes() {
  useNotifyNewVersion();

  return (
    <Routes>
      <Route index element={<Calculator />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/manual" element={<Manual />} />
      <Route path="/about" element={<About />} />
      <Route path="/history" element={<Protocol />} />
      <Route path="/definitions" element={<Definitions />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/imprint" element={<Imprint />} />
      <Route path="/new-version-available" element={<NewVersionAvailable />} />
    </Routes>
  );
}
