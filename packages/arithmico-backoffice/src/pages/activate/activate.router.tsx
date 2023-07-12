import { Route, Routes } from "react-router-dom";
import { ErrorCard } from "../../components/error-card/error-card";
import { SimplePage } from "../../components/simple-page/simple-page";
import { ActivatePage } from "./activate.page";

export function ActivateRouter() {
  return (
    <SimplePage>
      <Routes>
        <Route path=":activationId" element={<ActivatePage />} />
        <Route path=":activationId/failure" element={<ErrorCard />} />
      </Routes>
    </SimplePage>
  );
}
