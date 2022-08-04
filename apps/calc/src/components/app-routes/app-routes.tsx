import { Route, Routes } from "react-router-dom";
import Calculator from "@pages/calculator/calculator";
import Settings from "@pages/settings/settings";
import Manual from "@pages/manual/manual";
import About from "@pages/about/about";
import Protocol from "@pages/protocol/protocol";
import Definitions from "@pages/definitions/definitions";
import TermsOfService from "@pages/terms-of-service/terms-of-service";
import PrivacyPolicy from "@pages/privacy-policy/privacy-policy";
import ImprintContent from "@components/imprint-content/imprint-content";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/manual" element={<Manual />} />
      <Route path="/about" element={<About />} />
      <Route path="/protocol" element={<Protocol />} />
      <Route path="/definitions" element={<Definitions />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/imprint" element={<ImprintContent />} />
    </Routes>
  );
}
