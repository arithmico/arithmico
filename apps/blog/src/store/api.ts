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

export interface Article {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  authorIds: string[];
}

interface ArticleResponse {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    content: string;
    title: string;
    authors: {
      sys: {
        id: string;
      };
    }[];
  };
}

export interface Author {
  username: string;
  firstname: string;
  lastname: string;
  roles: string[];
}

interface AuthorResponse {
  sys: {
    id: string;
  };
  fields: {
    username: string;
    firstname: string;
    lastname: string;
    roles: string[];
  };
}

export const contentApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://cdn.arithmico.com/`,
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
    getAuthors: builder.query<Author[], { ids: string[] }>({
      query: ({ ids }) => ({
        url: `/entries/`,
        method: "GET",
        params: {
          content_type: "user",
          "sys.id[in]": ids.join(","),
        },
      }),
      transformResponse: (response: { items: AuthorResponse[] }): Author[] =>
        response.items.map((item) => ({
          firstname: item.fields.firstname,
          lastname: item.fields.lastname,
          roles: item.fields.roles,
          username: item.fields.username,
        })),
    }),
    getArticle: builder.query<Article, { id: string }>({
      query: ({ id }) => ({
        url: `/entries/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ArticleResponse): Article => ({
        id: response.sys.id,
        createdAt: response.sys.createdAt,
        authorIds: response.fields.authors.map((author) => author.sys.id),
        content: response.fields.content,
        title: response.fields.title,
      }),
    }),
    getArticles: builder.query<Article[], { limit?: number }>({
      query: ({ limit }) => ({
        url: "/entries",
        method: "GET",
        params: {
          content_type: "article",
          select: [
            "sys.id",
            "sys.createdAt",
            "fields.title",
            "fields.content",
            "fields.authors",
          ].join(","),
          limit,
        },
      }),
      transformResponse: (response: {
        items: ArticleResponse[];
      }): Article[] => {
        return response.items.map((article) => ({
          id: article.sys.id,
          createdAt: article.sys.createdAt,
          authorIds: article.fields.authors.map((author) => author.sys.id),
          content: article.fields.content,
          title: article.fields.title,
        }));
      },
    }),
  }),
});

export const {
  useGetChangelogsQuery,
  useGetChangelogQuery,
  useGetArticlesQuery,
  useGetArticleQuery,
  useGetAuthorsQuery,
} = contentApi;
