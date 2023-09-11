import { Route, Routes } from "react-router-dom";
import { DownloadsPage } from "./downloads.page";

export default function DownloadsRouter() {
  return (
    <Routes>
      <Route index element={<DownloadsPage />} />
    </Routes>
  );
}
