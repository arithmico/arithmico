import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./base-query";

export const api = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: ["SecurityPolicy"],
});
