import { Outlet, Route, Routes } from "react-router-dom";
import Release from "./release";
import { ReleaseList } from "./release-list";

export default function Releases() {
  return (
    <>
      <Routes>
        <Route index element={<ReleaseList />} />
        <Route path=":releaseId" element={<Release />} />
      </Routes>
      <Outlet />
    </>
  );
}
