import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Changelog {
  id: string;
  version: string;
  releaseDate: string;
  downloadUrl: string;
  content: string;
}

interface ChangelogResponse {
  sys: {
    id: string;
  };
  fields: {
    majorVersion: number;
    minorVersion: number;
    patchVersion: number;
    releaseDate: string;
    downloadUrl: string;
    content: string;
  };
}

export const contentApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://cdn.arithmico.com/environments/master`,
  }),
  endpoints: (builder) => ({
    getChangelogs: builder.query<Changelog[], { limit?: number }>({
      query: ({ limit }) => ({
        url: "/entries",
        method: "GET",
        params: {
          content_type: "changelog",
          select: [
            "sys.id",
            "fields.majorVersion",
            "fields.minorVersion",
            "fields.patchVersion",
            "fields.releaseDate",
            "fields.downloadUrl",
            "fields.content",
          ].join(","),
          order: [
            "-fields.majorVersion",
            "-fields.minorVersion",
            "-fields.patchVersion",
          ].join(","),
          limit,
        },
      }),
      transformResponse: (response: {
        items: ChangelogResponse[];
      }): Changelog[] =>
        response.items.map((item) => ({
          version: `v${item.fields.majorVersion}.${item.fields.minorVersion}.${item.fields.patchVersion}`,
          id: item.sys.id,
          content: item.fields.content,
          downloadUrl: item.fields.downloadUrl,
          releaseDate: item.fields.releaseDate,
        })),
    }),
    getChangelog: builder.query<Changelog, { id: string }>({
      query: ({ id }) => ({
        url: `/entries/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ChangelogResponse): Changelog => ({
        id: response.sys.id,
        version: `v${response.fields.majorVersion}.${response.fields.minorVersion}.${response.fields.patchVersion}`,
        content: response.fields.content,
        downloadUrl: response.fields.downloadUrl,
        releaseDate: response.fields.releaseDate,
      }),
    }),
  }),
});

export const { useGetChangelogsQuery, useGetChangelogQuery } = contentApi;
