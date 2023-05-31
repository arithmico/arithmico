import { Route, Routes } from "react-router-dom";
import { LoginFailurePage } from "./login-failure.page";
import { LoginPage } from "./login.page";

export function LoginRouter() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="failure" element={<LoginFailurePage />} />
    </Routes>
  );
}
