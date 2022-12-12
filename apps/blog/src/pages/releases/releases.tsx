import { Outlet, Route, Routes } from "react-router-dom";
import Release from "./release";

export default function Releases() {
  return (
    <>
      <Routes>
        <Route path=":releaseId" element={<Release />} />
      </Routes>
      <Outlet />
    </>
  );
}
